import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ValidationReport from '@/components/ValidationReport';
import { UniformLogo } from '@/components/UniformLogo';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

const ValidationPage = () => {
  const [loading, setLoading] = useState(true);
  const [functionalTests, setFunctionalTests] = useState([]);
  const [responsiveTests, setResponsiveTests] = useState([]);
  const [accessibilityTests, setAccessibilityTests] = useState([]);
  const [performanceTests, setPerformanceTests] = useState([]);
  const [testInProgress, setTestInProgress] = useState(false);

  useEffect(() => {
    runAllTests();
  }, []);

  const runAllTests = async () => {
    try {
      setLoading(true);
      setTestInProgress(true);
      
      // Simular chamadas de API para testes
      // Em um ambiente real, estas seriam chamadas reais para endpoints de teste
      
      // Testes funcionais
      const functionalResponse = await simulateApiCall('/api/tests/functional');
      setFunctionalTests(functionalResponse.data);
      
      // Testes de responsividade
      const responsiveResponse = await simulateApiCall('/api/tests/responsive');
      setResponsiveTests(responsiveResponse.data);
      
      // Testes de acessibilidade
      const accessibilityResponse = await simulateApiCall('/api/tests/accessibility');
      setAccessibilityTests(accessibilityResponse.data);
      
      // Testes de performance
      const performanceResponse = await simulateApiCall('/api/tests/performance');
      setPerformanceTests(performanceResponse.data);
      
      setLoading(false);
      setTestInProgress(false);
      toast.success('Testes concluídos com sucesso!');
    } catch (error) {
      console.error('Erro ao executar testes:', error);
      toast.error('Ocorreu um erro ao executar os testes. Tente novamente.');
      setLoading(false);
      setTestInProgress(false);
    }
  };
  
  // Função para simular chamadas de API durante o desenvolvimento
  const simulateApiCall = (endpoint) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Dados simulados para cada tipo de teste
        const testData = {
          '/api/tests/functional': generateFunctionalTests(),
          '/api/tests/responsive': generateResponsiveTests(),
          '/api/tests/accessibility': generateAccessibilityTests(),
          '/api/tests/performance': generatePerformanceTests(),
        };
        
        resolve({ data: testData[endpoint] });
      }, 1500); // Simular delay de rede
    });
  };
  
  // Geradores de dados de teste simulados
  const generateFunctionalTests = () => [
    {
      id: 'func-1',
      name: 'Login de usuário',
      component: 'AuthController',
      status: 'success',
      message: 'Autenticação funcionando',
    },
    {
      id: 'func-2',
      name: 'Recomendações personalizadas',
      component: 'AIController',
      status: 'success',
      message: 'Recomendações geradas corretamente',
    },
    {
      id: 'func-3',
      name: 'Sistema de pontos',
      component: 'GamificationController',
      status: 'success',
      message: 'Pontos atribuídos corretamente',
    },
    {
      id: 'func-4',
      name: 'Assistente virtual',
      component: 'AIAssistant',
      status: 'warning',
      message: 'Algumas respostas imprecisas',
    },
    {
      id: 'func-5',
      name: 'Simulados interativos',
      component: 'SimulationController',
      status: 'success',
      message: 'Funcionando conforme esperado',
    },
  ];
  
  const generateResponsiveTests = () => [
    {
      id: 'resp-1',
      name: 'Dashboard em dispositivos móveis',
      component: 'StudentDashboard',
      status: 'success',
      message: 'Adaptação correta',
    },
    {
      id: 'resp-2',
      name: 'Simulados em tablets',
      component: 'SimulationTake',
      status: 'success',
      message: 'Layout responsivo',
    },
    {
      id: 'resp-3',
      name: 'Trilhas em telas pequenas',
      component: 'TrailsList',
      status: 'error',
      message: 'Overflow horizontal',
    },
    {
      id: 'resp-4',
      name: 'Assistente em dispositivos móveis',
      component: 'AIAssistant',
      status: 'success',
      message: 'Adaptação correta',
    },
  ];
  
  const generateAccessibilityTests = () => [
    {
      id: 'acc-1',
      name: 'Contraste de cores',
      component: 'Global',
      status: 'success',
      message: 'Contraste adequado',
    },
    {
      id: 'acc-2',
      name: 'Navegação por teclado',
      component: 'Navigation',
      status: 'warning',
      message: 'Alguns elementos inacessíveis',
    },
    {
      id: 'acc-3',
      name: 'Textos alternativos em imagens',
      component: 'Images',
      status: 'success',
      message: 'Alt texts presentes',
    },
    {
      id: 'acc-4',
      name: 'Tamanho de fonte ajustável',
      component: 'Typography',
      status: 'success',
      message: 'Escalabilidade correta',
    },
  ];
  
  const generatePerformanceTests = () => [
    {
      id: 'perf-1',
      name: 'Tempo de carregamento inicial',
      component: 'App',
      status: 'success',
      message: '1.2s',
    },
    {
      id: 'perf-2',
      name: 'Renderização de listas longas',
      component: 'TrailsList',
      status: 'success',
      message: 'Virtualização eficiente',
    },
    {
      id: 'perf-3',
      name: 'Consumo de memória',
      component: 'Global',
      status: 'warning',
      message: 'Otimização necessária',
    },
    {
      id: 'perf-4',
      name: 'Tempo de resposta do backend',
      component: 'API',
      status: 'success',
      message: '230ms média',
    },
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Header com logo da Unifor */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Validação da Plataforma</h1>
        <UniformLogo className="h-10" />
      </div>
      
      {loading ? (
        // Esqueleto de carregamento
        <div className="space-y-6">
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>
      ) : (
        <div className="space-y-6">
          <ValidationReport 
            functionalTests={functionalTests}
            responsiveTests={responsiveTests}
            accessibilityTests={accessibilityTests}
            performanceTests={performanceTests}
            onRerunTests={runAllTests}
          />
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Ações Recomendadas</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="critical">
                <TabsList>
                  <TabsTrigger value="critical">Críticas</TabsTrigger>
                  <TabsTrigger value="improvements">Melhorias</TabsTrigger>
                </TabsList>
                
                <TabsContent value="critical" className="mt-4 space-y-4">
                  <div className="p-4 border rounded-lg bg-red-50">
                    <h3 className="font-medium text-red-800">Corrigir overflow horizontal em telas pequenas</h3>
                    <p className="text-sm text-red-700 mt-1">
                      O componente TrailsList apresenta overflow horizontal em dispositivos móveis, 
                      afetando a experiência do usuário em telas menores que 375px.
                    </p>
                    <div className="mt-2">
                      <Button variant="destructive" size="sm">Corrigir Agora</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="improvements" className="mt-4 space-y-4">
                  <div className="p-4 border rounded-lg bg-yellow-50">
                    <h3 className="font-medium text-yellow-800">Melhorar navegação por teclado</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Alguns elementos interativos não são acessíveis via teclado, 
                      dificultando o uso para pessoas com deficiência motora.
                    </p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">Agendar Melhoria</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-yellow-50">
                    <h3 className="font-medium text-yellow-800">Otimizar consumo de memória</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      A aplicação apresenta consumo de memória acima do ideal em sessões longas,
                      podendo afetar dispositivos com recursos limitados.
                    </p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">Agendar Melhoria</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-yellow-50">
                    <h3 className="font-medium text-yellow-800">Aprimorar precisão do assistente virtual</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      O assistente virtual ocasionalmente fornece respostas imprecisas para 
                      perguntas específicas sobre conteúdos do ENADE.
                    </p>
                    <div className="mt-2">
                      <Button variant="outline" size="sm">Agendar Melhoria</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="flex justify-end gap-4">
            <Button variant="outline" disabled={testInProgress}>
              Exportar Relatório
            </Button>
            <Button variant="default" disabled={testInProgress}>
              Avançar para Documentação
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidationPage;
