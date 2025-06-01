import streamlit as st
import json
import os
from datetime import datetime

# Configuração da página
st.set_page_config(
    page_title="Adm Academy - ENADE 2025",
    page_icon="📚",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Inicialização do estado da sessão
if "authenticated" not in st.session_state:
    st.session_state.authenticated = False
if "user" not in st.session_state:
    st.session_state.user = None
if "current_page" not in st.session_state:
    st.session_state.current_page = "login"

# Função para carregar dados simulados
def load_mock_data():
    # Criar diretório de dados se não existir
    os.makedirs("data", exist_ok=True)
    
    # Usuários simulados
    if not os.path.exists("data/users.json"):
        users = [
            {
                "id": "1",
                "name": "Estudante Teste",
                "email": "estudante@unifor.br",
                "password": "senha123",
                "role": "student",
                "progress": {
                    "trails_completed": 2,
                    "trails_in_progress": 3,
                    "simulations_completed": 5,
                    "points": 1250,
                    "level": 3
                }
            },
            {
                "id": "2",
                "name": "Professor Teste",
                "email": "professor@unifor.br",
                "password": "senha123",
                "role": "teacher"
            },
            {
                "id": "3",
                "name": "Coordenador Teste",
                "email": "coordenador@unifor.br",
                "password": "senha123",
                "role": "coordinator"
            }
        ]
        with open("data/users.json", "w") as f:
            json.dump(users, f)
    
    # Trilhas de aprendizado simuladas
    if not os.path.exists("data/trails.json"):
        trails = [
            {
                "id": "1",
                "title": "Formação Geral",
                "description": "Conteúdos gerais para todos os cursos",
                "modules": [
                    {"id": "1-1", "title": "Ética e Cidadania", "completed": True},
                    {"id": "1-2", "title": "Diversidade Cultural", "completed": True},
                    {"id": "1-3", "title": "Meio Ambiente e Sustentabilidade", "completed": False}
                ],
                "progress": 66,
                "image": "🌎"
            },
            {
                "id": "2",
                "title": "Administração Estratégica",
                "description": "Fundamentos de estratégia empresarial",
                "modules": [
                    {"id": "2-1", "title": "Análise de Ambiente", "completed": True},
                    {"id": "2-2", "title": "Formulação Estratégica", "completed": False},
                    {"id": "2-3", "title": "Implementação Estratégica", "completed": False}
                ],
                "progress": 33,
                "image": "📊"
            },
            {
                "id": "3",
                "title": "Finanças Corporativas",
                "description": "Gestão financeira e análise de investimentos",
                "modules": [
                    {"id": "3-1", "title": "Análise de Demonstrações Financeiras", "completed": True},
                    {"id": "3-2", "title": "Avaliação de Investimentos", "completed": False},
                    {"id": "3-3", "title": "Gestão de Capital de Giro", "completed": False}
                ],
                "progress": 33,
                "image": "💰"
            },
            {
                "id": "4",
                "title": "Marketing",
                "description": "Estratégias de marketing e comportamento do consumidor",
                "modules": [
                    {"id": "4-1", "title": "Pesquisa de Mercado", "completed": False},
                    {"id": "4-2", "title": "Marketing Digital", "completed": False},
                    {"id": "4-3", "title": "Comportamento do Consumidor", "completed": False}
                ],
                "progress": 0,
                "image": "🎯"
            },
            {
                "id": "5",
                "title": "Gestão de Pessoas",
                "description": "Liderança e desenvolvimento de equipes",
                "modules": [
                    {"id": "5-1", "title": "Recrutamento e Seleção", "completed": False},
                    {"id": "5-2", "title": "Desenvolvimento de Liderança", "completed": False},
                    {"id": "5-3", "title": "Gestão de Desempenho", "completed": False}
                ],
                "progress": 0,
                "image": "👥"
            }
        ]
        with open("data/trails.json", "w") as f:
            json.dump(trails, f)
    
    # Simulados
    if not os.path.exists("data/simulations.json"):
        simulations = [
            {
                "id": "1",
                "title": "Simulado Formação Geral",
                "description": "10 questões sobre temas gerais",
                "questions_count": 10,
                "time_limit": 30,
                "completed": True,
                "score": 80
            },
            {
                "id": "2",
                "title": "Simulado Administração Estratégica",
                "description": "15 questões específicas",
                "questions_count": 15,
                "time_limit": 45,
                "completed": True,
                "score": 73
            },
            {
                "id": "3",
                "title": "Simulado Finanças",
                "description": "12 questões específicas",
                "questions_count": 12,
                "time_limit": 36,
                "completed": True,
                "score": 92
            },
            {
                "id": "4",
                "title": "Simulado Marketing",
                "description": "10 questões específicas",
                "questions_count": 10,
                "time_limit": 30,
                "completed": True,
                "score": 65
            },
            {
                "id": "5",
                "title": "Simulado Completo ENADE",
                "description": "35 questões no formato oficial",
                "questions_count": 35,
                "time_limit": 180,
                "completed": True,
                "score": 78
            },
            {
                "id": "6",
                "title": "Simulado Gestão de Pessoas",
                "description": "10 questões específicas",
                "questions_count": 10,
                "time_limit": 30,
                "completed": False,
                "score": 0
            }
        ]
        with open("data/simulations.json", "w") as f:
            json.dump(simulations, f)
    
    # Conquistas
    if not os.path.exists("data/achievements.json"):
        achievements = [
            {
                "id": "1",
                "title": "Primeiro Login",
                "description": "Bem-vindo à plataforma!",
                "icon": "🎉",
                "unlocked": True,
                "date_unlocked": "2025-05-15"
            },
            {
                "id": "2",
                "title": "Maratonista",
                "description": "Complete 5 simulados",
                "icon": "🏃",
                "unlocked": True,
                "date_unlocked": "2025-05-20"
            },
            {
                "id": "3",
                "title": "Nota Máxima",
                "description": "Obtenha 100% em um simulado",
                "icon": "🏆",
                "unlocked": False,
                "date_unlocked": None
            },
            {
                "id": "4",
                "title": "Explorador",
                "description": "Acesse todas as trilhas de aprendizado",
                "icon": "🧭",
                "unlocked": True,
                "date_unlocked": "2025-05-18"
            },
            {
                "id": "5",
                "title": "Mestre do Conhecimento",
                "description": "Complete todas as trilhas",
                "icon": "🎓",
                "unlocked": False,
                "date_unlocked": None
            }
        ]
        with open("data/achievements.json", "w") as f:
            json.dump(achievements, f)

# Carregar dados simulados
load_mock_data()

# Função para autenticação
def authenticate(email, password):
    with open("data/users.json", "r") as f:
        users = json.load(f)
    
    for user in users:
        if user["email"] == email and user["password"] == password:
            st.session_state.authenticated = True
            st.session_state.user = user
            return True
    
    return False

# Função para logout
def logout():
    st.session_state.authenticated = False
    st.session_state.user = None
    st.session_state.current_page = "login"

# Aplicar CSS personalizado
def local_css():
    st.markdown("""
    <style>
        .main-header {
            font-size: 2.5rem;
            color: #1E40AF;
            margin-bottom: 1rem;
            text-align: center;
        }
        .sub-header {
            font-size: 1.5rem;
            color: #3B82F6;
            margin-bottom: 2rem;
            text-align: center;
        }
        .card {
            background-color: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 20px;
        }
        .metric-value {
            font-size: 2rem;
            font-weight: bold;
            color: #1E40AF;
        }
        .metric-label {
            font-size: 1rem;
            color: #6B7280;
        }
        .progress-container {
            margin-top: 10px;
            margin-bottom: 20px;
        }
        .achievement-card {
            display: inline-block;
            text-align: center;
            margin: 10px;
            padding: 15px;
            border-radius: 10px;
            background-color: #F3F4F6;
            width: 120px;
        }
        .achievement-icon {
            font-size: 2rem;
            margin-bottom: 10px;
        }
        .achievement-locked {
            opacity: 0.5;
        }
        .trail-card {
            cursor: pointer;
            transition: transform 0.3s;
        }
        .trail-card:hover {
            transform: translateY(-5px);
        }
        .trail-icon {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        .simulation-card {
            cursor: pointer;
            transition: transform 0.3s;
        }
        .simulation-card:hover {
            transform: translateY(-5px);
        }
        .login-container {
            max-width: 500px;
            margin: 0 auto;
            padding: 30px;
            background-color: white;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .stButton>button {
            width: 100%;
            background-color: #1E40AF;
            color: white;
        }
        .stButton>button:hover {
            background-color: #3B82F6;
        }
    </style>
    """, unsafe_allow_html=True)

# Aplicar CSS
local_css()

# Sidebar para navegação (apenas quando autenticado)
if st.session_state.authenticated:
    with st.sidebar:
        st.image("https://www.unifor.br/documents/20143/3597199/logo-unifor-azul.png", width=200)
        st.title(f"Olá, {st.session_state.user['name']}")
        
        st.markdown("### Menu")
        if st.button("Dashboard"):
            st.session_state.current_page = "dashboard"
        if st.button("Trilhas de Aprendizado"):
            st.session_state.current_page = "trails"
        if st.button("Simulados"):
            st.session_state.current_page = "simulations"
        if st.button("Analytics"):
            st.session_state.current_page = "analytics"
        if st.button("Conquistas"):
            st.session_state.current_page = "achievements"
        
        st.markdown("---")
        if st.button("Sair"):
            logout()
            # Removido st.experimental_rerun() - Usando rerun() em vez disso
            st.rerun()

# Página de login
if not st.session_state.authenticated:
    st.markdown("<h1 class='main-header'>Adm Academy</h1>", unsafe_allow_html=True)
    st.markdown("<h2 class='sub-header'>Preparação para o ENADE 2025</h2>", unsafe_allow_html=True)
    
    col1, col2, col3 = st.columns([1, 2, 1])
    
    with col2:
        st.markdown("<div class='login-container'>", unsafe_allow_html=True)
        st.markdown("<h3 style='text-align: center;'>Login</h3>", unsafe_allow_html=True)
        
        email = st.text_input("Email institucional")
        password = st.text_input("Senha", type="password")
        
        if st.button("Entrar"):
            if authenticate(email, password):
                st.session_state.current_page = "dashboard"
                # Removido st.experimental_rerun() - Usando rerun() em vez disso
                st.rerun()
            else:
                st.error("Email ou senha incorretos")
        
        st.markdown("<p style='text-align: center; margin-top: 20px;'>Esqueceu sua senha? <a href='#'>Recuperar</a></p>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
        
        st.markdown("""
        <div style='text-align: center; margin-top: 30px;'>
            <p>Credenciais de teste:</p>
            <p>Estudante: estudante@unifor.br / senha123</p>
            <p>Professor: professor@unifor.br / senha123</p>
            <p>Coordenador: coordenador@unifor.br / senha123</p>
        </div>
        """, unsafe_allow_html=True)

# Dashboard (página principal após login)
elif st.session_state.current_page == "dashboard":
    st.markdown("<h1 class='main-header'>Dashboard</h1>", unsafe_allow_html=True)
    
    # Carregar dados do usuário
    user = st.session_state.user
    
    # Métricas principais
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.markdown("<div class='card'>", unsafe_allow_html=True)
        st.markdown(f"<div class='metric-value'>{user['progress']['trails_completed']}/5</div>", unsafe_allow_html=True)
        st.markdown("<div class='metric-label'>Trilhas Concluídas</div>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div class='card'>", unsafe_allow_html=True)
        st.markdown(f"<div class='metric-value'>{user['progress']['simulations_completed']}/6</div>", unsafe_allow_html=True)
        st.markdown("<div class='metric-label'>Simulados Realizados</div>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col3:
        st.markdown("<div class='card'>", unsafe_allow_html=True)
        st.markdown(f"<div class='metric-value'>{user['progress']['points']}</div>", unsafe_allow_html=True)
        st.markdown("<div class='metric-label'>Pontos</div>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col4:
        st.markdown("<div class='card'>", unsafe_allow_html=True)
        st.markdown(f"<div class='metric-value'>{user['progress']['level']}</div>", unsafe_allow_html=True)
        st.markdown("<div class='metric-label'>Nível</div>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    # Progresso geral
    st.markdown("### Seu Progresso")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("<div class='card'>", unsafe_allow_html=True)
        st.markdown("#### Trilhas de Aprendizado")
        
        # Carregar trilhas
        with open("data/trails.json", "r") as f:
            trails = json.load(f)
        
        for trail in trails:
            st.markdown(f"<div class='progress-container'>", unsafe_allow_html=True)
            st.markdown(f"<p>{trail['title']}</p>", unsafe_allow_html=True)
            st.progress(trail['progress'] / 100)
            st.markdown(f"</div>", unsafe_allow_html=True)
        
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div class='card'>", unsafe_allow_html=True)
        st.markdown("#### Desempenho em Simulados")
        
        # Carregar simulados
        with open("data/simulations.json", "r") as f:
            simulations = json.load(f)
        
        # Filtrar apenas simulados completados
        completed_simulations = [sim for sim in simulations if sim['completed']]
        
        # Criar dados para o gráfico
        import plotly.express as px
        import pandas as pd
        
        if completed_simulations:
            df = pd.DataFrame(completed_simulations)
            fig = px.bar(
                df, 
                x='title', 
                y='score',
                labels={'title': 'Simulado', 'score': 'Pontuação (%)'},
                color='score',
                color_continuous_scale=px.colors.sequential.Blues,
                range_y=[0, 100]
            )
            fig.update_layout(height=300)
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info("Nenhum simulado completado ainda.")
        
        st.markdown("</div>", unsafe_allow_html=True)
    
    # Conquistas recentes
    st.markdown("### Conquistas Recentes")
    
    # Carregar conquistas
    with open("data/achievements.json", "r") as f:
        achievements = json.load(f)
    
    # Filtrar conquistas desbloqueadas
    unlocked_achievements = [ach for ach in achievements if ach['unlocked']]
    
    if unlocked_achievements:
        for achievement in unlocked_achievements:
            st.markdown(f"""
            <div class='achievement-card'>
                <div class='achievement-icon'>{achievement['icon']}</div>
                <div><strong>{achievement['title']}</strong></div>
                <div style='font-size: 0.8rem;'>{achievement['description']}</div>
            </div>
            """, unsafe_allow_html=True)
    else:
        st.info("Nenhuma conquista desbloqueada ainda.")

# Página de Trilhas de Aprendizado
elif st.session_state.current_page == "trails":
    st.markdown("<h1 class='main-header'>Trilhas de Aprendizado</h1>", unsafe_allow_html=True)
    
    # Carregar trilhas
    with open("data/trails.json", "r") as f:
        trails = json.load(f)
    
    # Exibir trilhas em grid
    col1, col2 = st.columns(2)
    
    for i, trail in enumerate(trails):
        with col1 if i % 2 == 0 else col2:
            st.markdown(f"""
            <div class='card trail-card'>
                <div class='trail-icon'>{trail['image']}</div>
                <h3>{trail['title']}</h3>
                <p>{trail['description']}</p>
                <div class='progress-container'>
                    <div>Progresso: {trail['progress']}%</div>
                    <div style='margin-top: 5px;'></div>
                </div>
            </div>
            """, unsafe_allow_html=True)
            st.progress(trail['progress'] / 100)
            
            # Botões de ação
            col_a, col_b = st.columns(2)
            with col_a:
                st.button(f"Continuar", key=f"continue_{trail['id']}")
            with col_b:
                st.button(f"Detalhes", key=f"details_{trail['id']}")

# Página de Simulados
elif st.session_state.current_page == "simulations":
    st.markdown("<h1 class='main-header'>Simulados</h1>", unsafe_allow_html=True)
    
    # Carregar simulados
    with open("data/simulations.json", "r") as f:
        simulations = json.load(f)
    
    # Separar simulados completados e pendentes
    completed_simulations = [sim for sim in simulations if sim['completed']]
    pending_simulations = [sim for sim in simulations if not sim['completed']]
    
    # Simulados pendentes
    st.markdown("### Simulados Disponíveis")
    
    if pending_simulations:
        col1, col2 = st.columns(2)
        
        for i, simulation in enumerate(pending_simulations):
            with col1 if i % 2 == 0 else col2:
                st.markdown(f"""
                <div class='card simulation-card'>
                    <h3>{simulation['title']}</h3>
                    <p>{simulation['description']}</p>
                    <p><strong>Questões:</strong> {simulation['questions_count']}</p>
                    <p><strong>Tempo:</strong> {simulation['time_limit']} minutos</p>
                </div>
                """, unsafe_allow_html=True)
                
                st.button(f"Iniciar Simulado", key=f"start_{simulation['id']}")
    else:
        st.info("Não há simulados pendentes.")
    
    # Simulados completados
    st.markdown("### Histórico de Simulados")
    
    if completed_simulations:
        # Criar dados para o gráfico
        import plotly.express as px
        import pandas as pd
        
        df = pd.DataFrame(completed_simulations)
        
        # Gráfico de desempenho
        fig = px.line(
            df, 
            x='title', 
            y='score',
            markers=True,
            labels={'title': 'Simulado', 'score': 'Pontuação (%)'},
            color_discrete_sequence=['#1E40AF']
        )
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)
        
        # Lista de simulados completados
        for simulation in completed_simulations:
            st.markdown(f"""
            <div class='card'>
                <h3>{simulation['title']}</h3>
                <p>{simulation['description']}</p>
                <p><strong>Pontuação:</strong> {simulation['score']}%</p>
                <p><strong>Questões:</strong> {simulation['questions_count']}</p>
                <p><strong>Tempo:</strong> {simulation['time_limit']} minutos</p>
            </div>
            """, unsafe_allow_html=True)
            
            col_a, col_b = st.columns(2)
            with col_a:
                st.button(f"Ver Detalhes", key=f"details_sim_{simulation['id']}")
            with col_b:
                st.button(f"Refazer", key=f"redo_{simulation['id']}")
    else:
        st.info("Nenhum simulado completado ainda.")

# Página de Analytics
elif st.session_state.current_page == "analytics":
    st.markdown("<h1 class='main-header'>Analytics Educacional</h1>", unsafe_allow_html=True)
    
    # Carregar dados
    with open("data/simulations.json", "r") as f:
        simulations = json.load(f)
    
    with open("data/trails.json", "r") as f:
        trails = json.load(f)
    
    # Filtrar simulados completados
    completed_simulations = [sim for sim in simulations if sim['completed']]
    
    # Análise de desempenho
    st.markdown("### Análise de Desempenho")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("<div class='card'>", unsafe_allow_html=True)
        st.markdown("#### Desempenho por Área")
        
        # Dados simulados de desempenho por área
        areas = {
            "Formação Geral": 80,
            "Administração Estratégica": 73,
            "Finanças": 92,
            "Marketing": 65,
            "Gestão de Pessoas": 70
        }
        
        # Criar gráfico de radar
        import plotly.graph_objects as go
        import pandas as pd
        import numpy as np
        
        # Preparar dados para o gráfico radar
        categories = list(areas.keys())
        values = list(areas.values())
        
        fig = go.Figure()
        
        fig.add_trace(go.Scatterpolar(
            r=values,
            theta=categories,
            fill='toself',
            name='Seu desempenho',
            line_color='#1E40AF'
        ))
        
        fig.add_trace(go.Scatterpolar(
            r=[75, 75, 75, 75, 75],
            theta=categories,
            fill='toself',
            name='Média da turma',
            line_color='#F59E0B',
            opacity=0.5
        ))
        
        fig.update_layout(
            polar=dict(
                radialaxis=dict(
                    visible=True,
                    range=[0, 100]
                )
            ),
            showlegend=True,
            height=400
        )
        
        st.plotly_chart(fig, use_container_width=True)
        
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div class='card'>", unsafe_allow_html=True)
        st.markdown("#### Evolução de Desempenho")
        
        # Dados simulados de evolução
        dates = ["2025-05-01", "2025-05-08", "2025-05-15", "2025-05-22", "2025-05-29"]
        scores = [65, 70, 75, 78, 82]
        
        # Criar gráfico de linha
        import plotly.express as px
        
        df = pd.DataFrame({
            "Data": dates,
            "Pontuação": scores
        })
        
        fig = px.line(
            df, 
            x="Data", 
            y="Pontuação",
            markers=True,
            labels={"Pontuação": "Pontuação (%)", "Data": "Data"},
            color_discrete_sequence=['#1E40AF']
        )
        
        fig.update_layout(height=400)
        st.plotly_chart(fig, use_container_width=True)
        
        st.markdown("</div>", unsafe_allow_html=True)
    
    # Previsão de desempenho
    st.markdown("### Previsão de Desempenho no ENADE")
    
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.markdown("<div class='card' style='text-align: center;'>", unsafe_allow_html=True)
        st.markdown("<h4>Previsão Atual</h4>", unsafe_allow_html=True)
        st.markdown("<div class='metric-value'>78%</div>", unsafe_allow_html=True)
        st.markdown("<div>Baseado no seu desempenho atual</div>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col2:
        st.markdown("<div class='card' style='text-align: center;'>", unsafe_allow_html=True)
        st.markdown("<h4>Potencial</h4>", unsafe_allow_html=True)
        st.markdown("<div class='metric-value'>85%</div>", unsafe_allow_html=True)
        st.markdown("<div>Se completar todas as trilhas recomendadas</div>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    with col3:
        st.markdown("<div class='card' style='text-align: center;'>", unsafe_allow_html=True)
        st.markdown("<h4>Média da Turma</h4>", unsafe_allow_html=True)
        st.markdown("<div class='metric-value'>75%</div>", unsafe_allow_html=True)
        st.markdown("<div>Baseado no desempenho coletivo</div>", unsafe_allow_html=True)
        st.markdown("</div>", unsafe_allow_html=True)
    
    # Recomendações personalizadas
    st.markdown("### Recomendações Personalizadas")
    
    st.markdown("<div class='card'>", unsafe_allow_html=True)
    st.markdown("""
    <h4>Para melhorar seu desempenho:</h4>
    <ul>
        <li><strong>Foco em Marketing:</strong> Esta é sua área com menor pontuação (65%). Recomendamos completar a trilha de Marketing.</li>
        <li><strong>Praticar mais simulados:</strong> Seus resultados melhoram consistentemente com a prática.</li>
        <li><strong>Revisar Gestão de Pessoas:</strong> Esta área tem potencial para melhoria significativa.</li>
    </ul>
    """, unsafe_allow_html=True)
    
    col_a, col_b = st.columns(2)
    with col_a:
        st.button("Ver Trilha de Marketing")
    with col_b:
        st.button("Iniciar Simulado Recomendado")
    
    st.markdown("</div>", unsafe_allow_html=True)

# Página de Conquistas
elif st.session_state.current_page == "achievements":
    st.markdown("<h1 class='main-header'>Conquistas</h1>", unsafe_allow_html=True)
    
    # Carregar conquistas
    with open("data/achievements.json", "r") as f:
        achievements = json.load(f)
    
    # Estatísticas de conquistas
    unlocked_count = len([ach for ach in achievements if ach['unlocked']])
    total_count = len(achievements)
    
    st.markdown(f"### Progresso: {unlocked_count}/{total_count} conquistas desbloqueadas")
    st.progress(unlocked_count / total_count)
    
    # Exibir todas as conquistas
    st.markdown("### Todas as Conquistas")
    
    for achievement in achievements:
        locked_class = "" if achievement['unlocked'] else "achievement-locked"
        unlocked_date = f"Desbloqueado em: {achievement['date_unlocked']}" if achievement['unlocked'] else "Bloqueado"
        
        st.markdown(f"""
        <div class='achievement-card {locked_class}'>
            <div class='achievement-icon'>{achievement['icon']}</div>
            <div><strong>{achievement['title']}</strong></div>
            <div style='font-size: 0.8rem;'>{achievement['description']}</div>
            <div style='font-size: 0.7rem; margin-top: 5px;'>{unlocked_date}</div>
        </div>
        """, unsafe_allow_html=True)
    
    # Próximas conquistas a desbloquear
    locked_achievements = [ach for ach in achievements if not ach['unlocked']]
    
    if locked_achievements:
        st.markdown("### Próximas Conquistas")
        
        for achievement in locked_achievements:
            st.markdown(f"""
            <div class='card'>
                <h4>{achievement['title']} {achievement['icon']}</h4>
                <p>{achievement['description']}</p>
                <div style='margin-top: 10px;'>
                    <strong>Como desbloquear:</strong>
                    <ul>
                        <li>{"Obtenha 100% em qualquer simulado" if achievement['title'] == "Nota Máxima" else "Complete todas as trilhas de aprendizado"}</li>
                    </ul>
                </div>
            </div>
            """, unsafe_allow_html=True)

# Rodapé
if st.session_state.authenticated:
    st.markdown("---")
    st.markdown("""
    <div style='text-align: center;'>
        <p>Adm Academy - Plataforma de Preparação para o ENADE 2025</p>
        <p>© 2025 Centro de Ciências da Comunicação e Gestão - Unifor</p>
    </div>
    """, unsafe_allow_html=True)
