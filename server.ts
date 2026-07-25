import express from 'express';
import path from 'path';
import jwt from 'jsonwebtoken';
import { db } from './server/dbStore';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'agro_kurbani_secret_key_2026';

app.use(express.json());

// Auth Helper Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// --- AUTH ROUTES ---
app.post('/api/auth/register', (req, res) => {
  try {
    const { name, email, phone, password, role, farm_name, location } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existing = db.findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ message: 'Email address already registered' });
    }

    const newUser = db.createUser({
      name,
      email,
      phone,
      password,
      role: role || 'customer',
      farm_name,
      location,
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({
      message: 'Registration successful',
      token,
      user: newUser,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Server error during registration' });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const valid = db.verifyPassword(email, password);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      message: 'Login successful',
      token,
      user,
    });
  } catch (err: any) {
    res.status(500).json({ message: 'Login error' });
  }
});

app.get('/api/auth/profile', authenticateToken, (req: any, res) => {
  const user = db.findUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ user });
});

app.put('/api/auth/profile', authenticateToken, (req: any, res) => {
  const user = db.findUserById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const { name, phone, farm_name, location } = req.body;
  if (name) user.name = name;
  if (phone) user.phone = phone;
  if (farm_name) user.farm_name = farm_name;
  if (location) user.location = location;

  res.json({ message: 'Profile updated successfully', user });
});

app.post('/api/auth/logout', (_req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// --- ANIMAL ROUTES ---
app.get('/api/animals', (req, res) => {
  const { category, search, minPrice, maxPrice, farmerId } = req.query;
  const animals = db.getAnimals({
    category: category as string,
    search: search as string,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    farmerId: farmerId ? Number(farmerId) : undefined,
  });
  res.json({ animals });
});

app.get('/api/animals/:id', (req, res) => {
  const id = Number(req.params.id);
  const animal = db.getAnimalById(id);
  if (!animal) {
    return res.status(404).json({ message: 'Animal not found' });
  }
  const shares = db.getSharesByAnimal(id);
  res.json({ animal, shares });
});

app.get('/api/animals/:id/shares', (req, res) => {
  const id = Number(req.params.id);
  const shares = db.getSharesByAnimal(id);
  res.json({ shares });
});

app.post('/api/animals', authenticateToken, (req: any, res) => {
  try {
    const { title, category, breed, age, weight, price, total_shares, description, image, health_certified, organic_fed, teeth_count } = req.body;
    
    if (!title || !category || !breed || !price || !weight) {
      return res.status(400).json({ message: 'Title, category, breed, price, and weight are required' });
    }

    const farmer = db.findUserById(req.user.id);

    const newAnimal = db.createAnimal({
      farmer_id: req.user.id,
      farmer_name: farmer?.name || 'Agro Farmer',
      farm_name: farmer?.farm_name || 'Premier Agro Farm',
      location: farmer?.location || 'Dhaka',
      title,
      category,
      breed,
      age: age || '2 Years',
      weight: Number(weight),
      price: Number(price),
      total_shares: Number(total_shares || (category === 'Goat' || category === 'Sheep' ? 1 : 7)),
      description: description || '',
      image: image || 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=1000&q=80',
      health_certified: health_certified ?? true,
      organic_fed: organic_fed ?? true,
      teeth_count: Number(teeth_count || 2),
    });

    res.status(201).json({ message: 'Animal listed successfully', animal: newAnimal });
  } catch (err: any) {
    res.status(500).json({ message: 'Error adding animal' });
  }
});

app.put('/api/animals/:id', authenticateToken, (req: any, res) => {
  const id = Number(req.params.id);
  const animal = db.getAnimalById(id);
  if (!animal) {
    return res.status(404).json({ message: 'Animal not found' });
  }

  // Only farmer owner or admin can update
  if (req.user.role !== 'admin' && animal.farmer_id !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized to update this animal listing' });
  }

  const updated = db.updateAnimal(id, req.body);
  res.json({ message: 'Animal updated successfully', animal: updated });
});

app.delete('/api/animals/:id', authenticateToken, (req: any, res) => {
  const id = Number(req.params.id);
  const animal = db.getAnimalById(id);
  if (!animal) {
    return res.status(404).json({ message: 'Animal not found' });
  }

  if (req.user.role !== 'admin' && animal.farmer_id !== req.user.id) {
    return res.status(403).json({ message: 'Unauthorized to delete this animal listing' });
  }

  db.deleteAnimal(id);
  res.json({ message: 'Animal removed successfully' });
});

// --- ORDER & PAYMENT ROUTES ---
app.post('/api/orders', authenticateToken, (req: any, res) => {
  try {
    const { animal_id, purchase_type, shares, payment_method, delivery_address, delivery_city, delivery_option, special_instructions } = req.body;

    if (!animal_id || !payment_method || !delivery_address || !delivery_city) {
      return res.status(400).json({ message: 'Animal ID, payment method, and delivery address are required' });
    }

    const { order, payment } = db.createOrder({
      customer_id: req.user.id,
      animal_id: Number(animal_id),
      purchase_type: purchase_type || 'share',
      shares: Number(shares || 1),
      payment_method,
      delivery_address,
      delivery_city,
      delivery_option,
      special_instructions,
    });

    res.status(201).json({ message: 'Order placed successfully!', order, payment });
  } catch (err: any) {
    res.status(400).json({ message: err.message || 'Order failed' });
  }
});

app.get('/api/orders', authenticateToken, (req: any, res) => {
  if (req.user.role === 'customer') {
    const orders = db.getOrders({ customer_id: req.user.id });
    return res.json({ orders });
  } else if (req.user.role === 'farmer') {
    const orders = db.getOrders({ farmer_id: req.user.id });
    return res.json({ orders });
  } else if (req.user.role === 'admin') {
    const orders = db.getOrders();
    return res.json({ orders });
  }
  res.json({ orders: [] });
});

app.get('/api/orders/:id', authenticateToken, (req: any, res) => {
  const id = Number(req.params.id);
  const order = db.getOrderById(id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json({ order });
});

app.put('/api/orders/:id/status', authenticateToken, (req: any, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;
  if (!status) {
    return res.status(400).json({ message: 'Delivery status is required' });
  }

  const updated = db.updateOrderStatus(id, status);
  if (!updated) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json({ message: 'Order status updated successfully', order: updated });
});

// --- FARMER ROUTES ---
app.get('/api/farmer/stats', authenticateToken, (req: any, res) => {
  if (req.user.role !== 'farmer' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  const animals = db.getAnimals({ farmerId: req.user.id });
  const orders = db.getOrders({ farmer_id: req.user.id });
  const totalEarned = orders.reduce((acc, o) => acc + o.total_price, 0);

  res.json({
    totalAnimals: animals.length,
    soldAnimals: animals.filter((a) => a.status === 'sold').length,
    activeListings: animals.filter((a) => a.status === 'available').length,
    totalOrders: orders.length,
    totalEarned,
  });
});

app.get('/api/farmer/animals', authenticateToken, (req: any, res) => {
  const animals = db.getAnimals({ farmerId: req.user.id });
  res.json({ animals });
});

app.get('/api/farmer/orders', authenticateToken, (req: any, res) => {
  const orders = db.getOrders({ farmer_id: req.user.id });
  res.json({ orders });
});

// --- ADMIN ROUTES ---
app.get('/api/admin/users', authenticateToken, (req: any, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  const users = db.getAllUsers();
  res.json({ users });
});

app.delete('/api/admin/user/:id', authenticateToken, (req: any, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  const id = Number(req.params.id);
  const deleted = db.deleteUser(id);
  if (!deleted) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ message: 'User deleted successfully' });
});

app.get('/api/admin/orders', authenticateToken, (req: any, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  const orders = db.getOrders();
  res.json({ orders });
});

app.get('/api/admin/reports', authenticateToken, (req: any, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  const stats = db.getSystemStats();
  res.json({ stats });
});

// Vite & Static Asset Handling
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Agro Kurbani Server running on http://localhost:${PORT}`);
  });
}

startServer();
