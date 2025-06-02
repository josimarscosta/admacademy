import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface TestResult {
  id: string;
  name: string;
  component: string;
  status: 'success' | 'error' | 'warning';
  message?: string;
  details?: string;
}

interface ValidationReportProps {
  functionalTests: TestResult[];
  responsiveTests: TestResult[];
  accessibilityTests: TestResult[];
  performanceTests: TestResult[];
  onRerunTests: () => void;
}

const ValidationReport: React.FC<ValidationReportProps> = ({
  functionalTests,
  responsiveTests,
  accessibilityTests,
  performanceTests,
  onRerunTests
}) => {
  // Calcular estatísticas
  const calculateStats = (tests: TestResult[]) => {
    const total = tests.length;
    const success = tests.filter(t => t.status === 'success').length;
    const error = tests.filter(t => t.status === 'error').length;
    const warning = tests.filter(t => t.status === 'warning').length;
    
    return {
      total,
      success,
      error,
      warning,
      successRate: total > 0 ? Math.round((success / total) * 100) : 0
    };
  };
  
  const functionalStats = calculateStats(functionalTests);
  const responsiveStats = calculateStats(responsiveTests);
  const accessibilityStats = calculateStats(accessibilityTests);
  const performanceStats = calculateStats(performanceTests);
  
  // Renderizar ícone de status
  const renderStatusIcon = (status: 'success' | 'error' | 'warning') => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };
  
  // Renderizar tabela de testes
  const renderTestTable = (tests: TestResult[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Status</TableHead>
          <TableHead>Nome do Teste</TableHead>
          <TableHead>Componente</TableHead>
          <TableHead className="text-right">Detalhes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tests.map((test) => (
          <TableRow key={test.id}>
            <TableCell>{renderStatusIcon(test.status)}</TableCell>
            <TableCell className="font-medium">{test.name}</TableCell>
            <TableCell>{test.component}</TableCell>
            <TableCell className="text-right">
              {test.message && (
                <Badge 
                  variant="outline" 
                  className={
                    test.status === 'success' ? 'bg-green-100 text-green-800' :
                    test.status === 'error' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }
                >
                  {test.message}
                </Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex justify-between items-center">
          <span>Relatório de Validação</span>
          <Button onClick={onRerunTests}>Executar Testes Novamente</Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Resumo dos testes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Funcionalidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{functionalStats.successRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {functionalStats.success} de {functionalStats.total} testes passaram
                </p>
                {functionalStats.error > 0 && (
                  <Badge variant="destructive" className="mt-2">
                    {functionalStats.error} falhas
                  </Badge>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Responsividade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{responsiveStats.successRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {responsiveStats.success} de {responsiveStats.total} testes passaram
                </p>
                {responsiveStats.error > 0 && (
                  <Badge variant="destructive" className="mt-2">
                    {responsiveStats.error} falhas
                  </Badge>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Acessibilidade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{accessibilityStats.successRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {accessibilityStats.success} de {accessibilityStats.total} testes passaram
                </p>
                {accessibilityStats.error > 0 && (
                  <Badge variant="destructive" className="mt-2">
                    {accessibilityStats.error} falhas
                  </Badge>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{performanceStats.successRate}%</div>
                <p className="text-xs text-muted-foreground">
                  {performanceStats.success} de {performanceStats.total} testes passaram
                </p>
                {performanceStats.error > 0 && (
                  <Badge variant="destructive" className="mt-2">
                    {performanceStats.error} falhas
                  </Badge>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Detalhes dos testes */}
          <Tabs defaultValue="functional">
            <TabsList>
              <TabsTrigger value="functional">Funcionalidade</TabsTrigger>
              <TabsTrigger value="responsive">Responsividade</TabsTrigger>
              <TabsTrigger value="accessibility">Acessibilidade</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="functional" className="mt-4">
              {renderTestTable(functionalTests)}
            </TabsContent>
            
            <TabsContent value="responsive" className="mt-4">
              {renderTestTable(responsiveTests)}
            </TabsContent>
            
            <TabsContent value="accessibility" className="mt-4">
              {renderTestTable(accessibilityTests)}
            </TabsContent>
            
            <TabsContent value="performance" className="mt-4">
              {renderTestTable(performanceTests)}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default ValidationReport;
