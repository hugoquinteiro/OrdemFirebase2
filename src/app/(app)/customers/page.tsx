import { getCustomers } from "@/services/customer-service";
import { CustomerForm } from "./_components/customer-form";
import { CustomerList } from "./_components/customer-list";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-headline">Clientes</h1>
          <p className="text-muted-foreground">
            Gerencie seus clientes e veja seus detalhes.
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Novo Cliente
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-headline">Novo Cliente</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo cliente.
              </DialogDescription>
            </DialogHeader>
            <CustomerForm />
          </DialogContent>
        </Dialog>
      </div>

      <CustomerList customers={customers} />
    </div>
  );
}
