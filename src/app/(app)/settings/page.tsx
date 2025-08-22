import { CompanyForm } from "@/components/settings/company-form";
import { SeedButton } from "@/components/settings/seed-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCompanyInfo } from "@/services/settings-service";

export default async function SettingsPage() {
  const companyInfo = await getCompanyInfo();

  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="text-3xl font-bold font-headline">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações da sua conta e do aplicativo.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Informações da Empresa</CardTitle>
            <CardDescription>Atualize os dados da sua empresa, incluindo a logomarca.</CardDescription>
        </CardHeader>
        <CardContent>
            <CompanyForm companyInfo={companyInfo} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Banco de Dados</CardTitle>
            <CardDescription>Use o botão abaixo para popular o banco de dados com dados de exemplo para teste e demonstração.</CardDescription>
        </CardHeader>
        <CardContent>
            <SeedButton />
        </CardContent>
      </Card>
    </div>
  );
}
