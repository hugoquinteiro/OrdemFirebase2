export type Customer = {
  name: string;
  email: string;
  phone: string;
  document: string; // CPF/CNPJ
  createdAt: string;
};

export type Product = {
  name: string;
  type: 'Produto' | 'Serviço';
  unit: string;
  value: number;
  photoUrl?: string;
};

export type BudgetStatus = 'Aberto' | 'Aceito' | 'Finalizado' | 'Recusado';

export type BudgetItem = {
  productId: string;
  productName: string;
  quantity: number;
  unitValue: number;
};

export type Budget = {
  customerId: string;
  customerName: string;
  items: BudgetItem[];
  total: number;
  status: BudgetStatus;
  createdAt: string;
  expiresAt: string;
};

export type WithId<T> = T & { id: string };

export type HydratedBudgetItem = {
  product: WithId<Product>;
  quantity: number;
  unitValue: number;
}

export type HydratedBudget = {
  id: string;
  customer: WithId<Customer>;
  items: HydratedBudgetItem[];
  total: number;
  status: BudgetStatus;
  createdAt: string;
  expiresAt: string;
}

export type CompanyInfo = {
  name: string;
  logoUrl: string;
}
