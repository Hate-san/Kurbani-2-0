import { User, Animal, Order, Share, Payment, SystemStats, AnimalStatus, DeliveryStatus } from '../src/types';

// In-Memory persistent data store mimicking MySQL database schema with full seed data
class AgroDatabase {
  private users: User[] = [
    {
      id: 1,
      name: 'Rahim Ahmed',
      email: 'customer@demo.com',
      phone: '+880 1711 000111',
      role: 'customer',
      location: 'Dhaka, Bangladesh',
      created_at: '2026-01-10T10:00:00Z',
    },
    {
      id: 2,
      name: 'Haji Shariful Agro Farm',
      email: 'farmer@demo.com',
      phone: '+880 1819 222333',
      role: 'farmer',
      farm_name: 'Shariful Organic Cattle Farm',
      location: 'Savar, Dhaka',
      created_at: '2026-01-15T11:30:00Z',
    },
    {
      id: 3,
      name: 'Kazi Agro Complex',
      email: 'kazi@agro.com',
      phone: '+880 1912 333444',
      role: 'farmer',
      farm_name: 'Kazi Premier Livestock',
      location: 'Pabna, Rajshahi',
      created_at: '2026-02-01T08:15:00Z',
    },
    {
      id: 4,
      name: 'System Admin',
      email: 'admin@demo.com',
      phone: '+880 1611 999888',
      role: 'admin',
      location: 'Dhaka HQ',
      created_at: '2026-01-01T00:00:00Z',
    },
  ];

  private passwords: Record<string, string> = {
    'customer@demo.com': 'password123',
    'farmer@demo.com': 'password123',
    'kazi@agro.com': 'password123',
    'admin@demo.com': 'admin123',
  };

  private animals: Animal[] = [
    {
      id: 101,
      farmer_id: 2,
      farmer_name: 'Haji Shariful Agro Farm',
      farm_name: 'Shariful Organic Cattle Farm',
      location: 'Savar, Dhaka',
      title: 'Shahiwal Premium Red Bull (King Sultan)',
      category: 'Bull',
      breed: 'Shahiwal',
      age: '2.5 Years',
      weight: 580,
      price: 280000,
      total_shares: 7,
      available_shares: 4,
      description: 'Massive organic grass-fed Shahiwal bull with excellent meat ratio. Fully vaccinated, health inspected, and ideal for 7-share partial Kurbani.',
      image: 'https://images.unsplash.com/photo-1673229266917-89abfa3ebc58?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      status: 'available',
      health_certified: true,
      organic_fed: true,
      teeth_count: 4,
      created_at: '2026-06-01T10:00:00Z',
    },
    {
      id: 102,
      farmer_id: 2,
      farmer_name: 'Haji Shariful Agro Farm',
      farm_name: 'Shariful Organic Cattle Farm',
      location: 'Savar, Dhaka',
      title: 'Australian Cross Black Bull (Thunder)',
      category: 'Bull',
      breed: 'Australian Cross',
      age: '3 Years',
      weight: 650,
      price: 350000,
      total_shares: 7,
      available_shares: 2,
      description: 'Premium heavy breed bull with docile temperament. Fed with organic silage, corn meal, and fresh grass. High meat yield guarantee.',
      image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1000&q=80',
      status: 'available',
      health_certified: true,
      organic_fed: true,
      teeth_count: 4,
      created_at: '2026-06-05T12:00:00Z',
    },
    {
      id: 103,
      farmer_id: 3,
      farmer_name: 'Kazi Agro Complex',
      farm_name: 'Kazi Premier Livestock',
      location: 'Pabna, Rajshahi',
      title: 'Deshi Pure White Cow (Shanti)',
      category: 'Cow',
      breed: 'Local Deshi',
      age: '2 Years',
      weight: 380,
      price: 175000,
      total_shares: 7,
      available_shares: 7,
      description: 'Healthy local deshi cow raised in natural pasture land. Tender meat quality, disease-free, verified teeth count.',
      image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=1000&q=80',
      status: 'available',
      health_certified: true,
      organic_fed: true,
      teeth_count: 2,
      created_at: '2026-06-10T09:30:00Z',
    },
    {
      id: 104,
      farmer_id: 3,
      farmer_name: 'Kazi Agro Complex',
      farm_name: 'Kazi Premier Livestock',
      location: 'Pabna, Rajshahi',
      title: 'Kashmiri Long-Ear He-Goat (Sheru)',
      category: 'Goat',
      breed: 'Kashmiri',
      age: '1.5 Years',
      weight: 45,
      price: 38000,
      total_shares: 1,
      available_shares: 1,
      description: 'Stunning long-eared black & white Kashmiri goat. Single full sacrifice animal. Vigorous health and grass-reared.',
      image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=1000&q=80',
      status: 'available',
      health_certified: true,
      organic_fed: true,
      teeth_count: 2,
      created_at: '2026-06-12T14:20:00Z',
    },
    {
      id: 105,
      farmer_id: 2,
      farmer_name: 'Haji Shariful Agro Farm',
      farm_name: 'Shariful Organic Cattle Farm',
      location: 'Savar, Dhaka',
      title: 'Sindhi Cross Red Cattle (Bahadur)',
      category: 'Bull',
      breed: 'Red Sindhi',
      age: '2.8 Years',
      weight: 520,
      price: 245000,
      total_shares: 7,
      available_shares: 0,
      description: 'Fully booked Sindhi cross bull. Premium marbling meat, well-cared for in Savar dairy cluster.',
      image: 'https://images.unsplash.com/photo-1545468841-830f6dbf4d6d?auto=format&fit=crop&w=1000&q=80',
      status: 'sold',
      health_certified: true,
      organic_fed: true,
      teeth_count: 4,
      created_at: '2026-05-20T11:00:00Z',
    },
    {
      id: 106,
      farmer_id: 3,
      farmer_name: 'Kazi Agro Complex',
      farm_name: 'Kazi Premier Livestock',
      location: 'Pabna, Rajshahi',
      title: 'Garole Native Bengal Sheep (Lalu)',
      category: 'Sheep',
      breed: 'Garole',
      age: '1.8 Years',
      weight: 38,
      price: 28000,
      total_shares: 1,
      available_shares: 1,
      description: 'Compact healthy native Garole sheep. Fully compliance with Shariah guidelines for single sacrifice.',
      image: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?auto=format&fit=crop&w=1000&q=80',
      status: 'available',
      health_certified: true,
      organic_fed: true,
      teeth_count: 2,
      created_at: '2026-06-15T16:00:00Z',
    }
  ];

  private orders: Order[] = [
    {
      id: 501,
      order_number: 'AK-2026-8801',
      customer_id: 1,
      customer_name: 'Rahim Ahmed',
      customer_phone: '+880 1711 000111',
      animal_id: 101,
      animal_title: 'Shahiwal Premium Red Bull (King Sultan)',
      animal_category: 'Bull',
      animal_image: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=1000&q=80',
      farmer_name: 'Haji Shariful Agro Farm',
      purchase_type: 'share',
      shares: 2,
      price_per_share: 40000,
      total_price: 80000,
      payment_status: 'paid',
      delivery_status: 'slaughtered',
      payment_method: 'bKash',
      transaction_id: 'TRX-BK8892019',
      delivery_address: 'House 42, Road 11, Block D, Banani',
      delivery_city: 'Dhaka',
      delivery_option: 'meat_packaged',
      special_instructions: 'Please divide meat into 3 equal 1/3 portions for family, relatives, and charity.',
      created_at: '2026-07-20T11:30:00Z',
    },
    {
      id: 502,
      order_number: 'AK-2026-8802',
      customer_id: 1,
      customer_name: 'Rahim Ahmed',
      customer_phone: '+880 1711 000111',
      animal_id: 102,
      animal_title: 'Australian Cross Black Bull (Thunder)',
      animal_category: 'Bull',
      animal_image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=1000&q=80',
      farmer_name: 'Haji Shariful Agro Farm',
      purchase_type: 'share',
      shares: 1,
      price_per_share: 50000,
      total_price: 50000,
      payment_status: 'paid',
      delivery_status: 'farm_preparing',
      payment_method: 'Credit Card',
      transaction_id: 'TRX-CC772109',
      delivery_address: 'House 15, Sector 4, Uttara',
      delivery_city: 'Dhaka',
      delivery_option: 'meat_packaged',
      created_at: '2026-07-22T09:15:00Z',
    }
  ];

  private shares: Share[] = [
    { id: 1, animal_id: 101, customer_id: 1, customer_name: 'Rahim Ahmed', share_number: 1, purchased_at: '2026-07-20T11:30:00Z' },
    { id: 2, animal_id: 101, customer_id: 1, customer_name: 'Rahim Ahmed', share_number: 2, purchased_at: '2026-07-20T11:30:00Z' },
    { id: 3, animal_id: 101, customer_id: 99, customer_name: 'Tariqul Islam', share_number: 3, purchased_at: '2026-07-18T10:00:00Z' },
    { id: 4, animal_id: 102, customer_id: 1, customer_name: 'Rahim Ahmed', share_number: 1, purchased_at: '2026-07-22T09:15:00Z' },
    { id: 5, animal_id: 102, customer_id: 88, customer_name: 'Monir Chowdhury', share_number: 2, purchased_at: '2026-07-19T14:00:00Z' },
    { id: 6, animal_id: 102, customer_id: 88, customer_name: 'Monir Chowdhury', share_number: 3, purchased_at: '2026-07-19T14:00:00Z' },
    { id: 7, animal_id: 102, customer_id: 77, customer_name: 'Dr. Kabir Hossain', share_number: 4, purchased_at: '2026-07-21T08:30:00Z' },
    { id: 8, animal_id: 102, customer_id: 77, customer_name: 'Dr. Kabir Hossain', share_number: 5, purchased_at: '2026-07-21T08:30:00Z' },
  ];

  private payments: Payment[] = [
    {
      id: 901,
      order_id: 501,
      transaction_id: 'TRX-BK8892019',
      payment_method: 'bKash',
      amount: 80000,
      status: 'completed',
      paid_at: '2026-07-20T11:31:00Z',
    },
    {
      id: 902,
      order_id: 502,
      transaction_id: 'TRX-CC772109',
      payment_method: 'Credit Card',
      amount: 50000,
      status: 'completed',
      paid_at: '2026-07-22T09:16:00Z',
    }
  ];

  // Auth Methods
  public findUserByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  public findUserById(id: number): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  public createUser(userData: Partial<User> & { password?: string }): User {
    const newId = this.users.length ? Math.max(...this.users.map((u) => u.id)) + 1 : 1;
    const newUser: User = {
      id: newId,
      name: userData.name || 'New User',
      email: userData.email!,
      phone: userData.phone || '',
      role: userData.role || 'customer',
      farm_name: userData.farm_name,
      location: userData.location || 'Dhaka',
      created_at: new Date().toISOString(),
    };
    this.users.push(newUser);
    if (userData.password) {
      this.passwords[newUser.email] = userData.password;
    }
    return newUser;
  }

  public verifyPassword(email: string, pass: string): boolean {
    const stored = this.passwords[email];
    return stored === pass;
  }

  public getAllUsers(): User[] {
    return this.users;
  }

  public deleteUser(id: number): boolean {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx !== -1) {
      this.users.splice(idx, 1);
      return true;
    }
    return false;
  }

  // Animal Methods
  public getAnimals(filters?: { category?: string; search?: string; minPrice?: number; maxPrice?: number; farmerId?: number }): Animal[] {
    let result = [...this.animals];

    if (filters) {
      if (filters.category && filters.category !== 'All') {
        result = result.filter((a) => a.category.toLowerCase() === filters.category!.toLowerCase());
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        result = result.filter((a) => 
          a.title.toLowerCase().includes(q) || 
          a.breed.toLowerCase().includes(q) ||
          (a.farm_name && a.farm_name.toLowerCase().includes(q)) ||
          a.location?.toLowerCase().includes(q)
        );
      }
      if (filters.minPrice !== undefined && filters.minPrice > 0) {
        result = result.filter((a) => a.price >= filters.minPrice!);
      }
      if (filters.maxPrice !== undefined && filters.maxPrice > 0) {
        result = result.filter((a) => a.price <= filters.maxPrice!);
      }
      if (filters.farmerId !== undefined) {
        result = result.filter((a) => a.farmer_id === filters.farmerId);
      }
    }

    return result;
  }

  public getAnimalById(id: number): Animal | undefined {
    return this.animals.find((a) => a.id === id);
  }

  public createAnimal(animalData: Omit<Animal, 'id' | 'status' | 'available_shares'> & { status?: AnimalStatus; available_shares?: number }): Animal {
    const newId = this.animals.length ? Math.max(...this.animals.map((a) => a.id)) + 1 : 100;
    const totalShares = animalData.total_shares || 7;
    
    const newAnimal: Animal = {
      ...animalData,
      id: newId,
      total_shares: totalShares,
      available_shares: animalData.available_shares ?? totalShares,
      status: animalData.status || 'available',
      created_at: new Date().toISOString(),
    };
    this.animals.unshift(newAnimal);
    return newAnimal;
  }

  public updateAnimal(id: number, updates: Partial<Animal>): Animal | null {
    const animal = this.animals.find((a) => a.id === id);
    if (!animal) return null;

    Object.assign(animal, updates);
    if (animal.available_shares <= 0) {
      animal.available_shares = 0;
      animal.status = 'sold';
    }
    return animal;
  }

  public deleteAnimal(id: number): boolean {
    const idx = this.animals.findIndex((a) => a.id === id);
    if (idx !== -1) {
      this.animals.splice(idx, 1);
      return true;
    }
    return false;
  }

  // Shares Methods
  public getSharesByAnimal(animalId: number): Share[] {
    return this.shares.filter((s) => s.animal_id === animalId);
  }

  // Order & Purchase Processing
  public createOrder(orderPayload: {
    customer_id: number;
    animal_id: number;
    purchase_type: 'whole' | 'share';
    shares: number;
    payment_method: string;
    delivery_address: string;
    delivery_city: string;
    delivery_option?: 'live_animal' | 'meat_packaged' | 'charity_donated';
    special_instructions?: string;
  }): { order: Order; payment: Payment } {
    const animal = this.getAnimalById(orderPayload.animal_id);
    if (!animal) {
      throw new Error('Animal not found');
    }

    const customer = this.findUserById(orderPayload.customer_id);

    let requestedShares = orderPayload.shares;
    if (orderPayload.purchase_type === 'whole') {
      requestedShares = animal.available_shares; // All remaining
    }

    if (requestedShares <= 0 || requestedShares > animal.available_shares) {
      throw new Error(`Only ${animal.available_shares} shares available for this animal.`);
    }

    const pricePerShare = Math.round(animal.price / animal.total_shares);
    const totalPrice = pricePerShare * requestedShares;

    // Create Order Record
    const newOrderId = this.orders.length ? Math.max(...this.orders.map((o) => o.id)) + 1 : 500;
    const orderNumber = `AK-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      id: newOrderId,
      order_number: orderNumber,
      customer_id: orderPayload.customer_id,
      customer_name: customer?.name || 'Customer',
      customer_phone: customer?.phone || '+880 1700 000000',
      animal_id: animal.id,
      animal_title: animal.title,
      animal_category: animal.category,
      animal_image: animal.image,
      farmer_name: animal.farmer_name,
      purchase_type: orderPayload.purchase_type,
      shares: requestedShares,
      price_per_share: pricePerShare,
      total_price: totalPrice,
      payment_status: 'paid', // simulated instant success
      delivery_status: 'processing',
      payment_method: orderPayload.payment_method,
      transaction_id: `TRX-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      delivery_address: orderPayload.delivery_address,
      delivery_city: orderPayload.delivery_city,
      delivery_option: orderPayload.delivery_option || 'meat_packaged',
      special_instructions: orderPayload.special_instructions,
      created_at: new Date().toISOString(),
    };

    this.orders.unshift(newOrder);

    // Update Animal available shares and status
    animal.available_shares -= requestedShares;
    if (animal.available_shares <= 0) {
      animal.available_shares = 0;
      animal.status = 'sold';
    }

    // Assign Share Slots
    const existingShares = this.getSharesByAnimal(animal.id);
    const startShareNum = existingShares.length + 1;
    for (let i = 0; i < requestedShares; i++) {
      const shareNum = startShareNum + i;
      this.shares.push({
        id: this.shares.length + 1,
        animal_id: animal.id,
        customer_id: orderPayload.customer_id,
        customer_name: customer?.name || 'Customer',
        share_number: shareNum,
        purchased_at: new Date().toISOString(),
      });
    }

    // Create Payment record
    const paymentId = this.payments.length ? Math.max(...this.payments.map((p) => p.id)) + 1 : 900;
    const newPayment: Payment = {
      id: paymentId,
      order_id: newOrder.id,
      transaction_id: newOrder.transaction_id!,
      payment_method: orderPayload.payment_method,
      amount: totalPrice,
      status: 'completed',
      paid_at: new Date().toISOString(),
    };
    this.payments.unshift(newPayment);

    return { order: newOrder, payment: newPayment };
  }

  public getOrders(filters?: { customer_id?: number; farmer_id?: number }): Order[] {
    let result = [...this.orders];
    if (filters?.customer_id) {
      result = result.filter((o) => o.customer_id === filters.customer_id);
    }
    if (filters?.farmer_id) {
      // Find animals belonging to farmer
      const farmerAnimalIds = this.animals
        .filter((a) => a.farmer_id === filters.farmer_id)
        .map((a) => a.id);
      result = result.filter((o) => farmerAnimalIds.includes(o.animal_id));
    }
    return result;
  }

  public getOrderById(id: number): Order | undefined {
    return this.orders.find((o) => o.id === id);
  }

  public updateOrderStatus(orderId: number, status: DeliveryStatus): Order | null {
    const order = this.orders.find((o) => o.id === orderId);
    if (!order) return null;
    order.delivery_status = status;
    return order;
  }

  // System Stats
  public getSystemStats(): SystemStats {
    const totalUsers = this.users.length;
    const totalCustomers = this.users.filter((u) => u.role === 'customer').length;
    const totalFarmers = this.users.filter((u) => u.role === 'farmer').length;
    const totalAnimals = this.animals.length;
    const totalSoldAnimals = this.animals.filter((a) => a.status === 'sold').length;
    const totalOrders = this.orders.length;
    const totalRevenue = this.orders.reduce((sum, o) => sum + o.total_price, 0);
    const totalSharesSold = this.shares.length;

    return {
      totalUsers,
      totalCustomers,
      totalFarmers,
      totalAnimals,
      totalSoldAnimals,
      totalOrders,
      totalRevenue,
      totalSharesSold,
    };
  }
}

export const db = new AgroDatabase();
