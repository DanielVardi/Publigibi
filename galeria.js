/* GALERIA MULTI-CATEGORIA - ALMANAQUE
   Estrutura: 
   categoria: [ 
       { img: 'url', titulo: 'titulo', legenda: 'texto detalhado', link: 'url_destino' } 
   ]
*/

const bancoGaleria = {
    'fotos': [
        {
            img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000', 
            titulo: 'Bastidores da Rádio',
            legenda: 'Nossa equipe técnica preparando a transmissão de sábado.',
            link: '#'
        },
        {
            img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000',
            titulo: 'Estúdio 1',
            legenda: 'Onde a mágica acontece todos os dias.',
            link: '#'
        }
    ],
    'convidados': [
        {
            img: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1000', 
            titulo: 'Entrevista: Maurício de Sousa',
            legenda: 'Um bate-papo incrível sobre o futuro dos quadrinhos.',
            link: 'https://youtube.com'
        }
    ],
    'promocoes': [
        {
            img: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=1000', 
            titulo: 'Sorteio de Ingressos',
            legenda: 'Concorra a par de ingressos para o show de MPB! Clique em Saiba Mais.',
            link: 'https://instagram.com'
        }
    ],
    'eventos': [
        {
            img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000', 
            titulo: 'Festa Junina do Almanaque',
            legenda: 'Dia 24 de Junho no Parque Jean-Drapeau. Não perca!',
            link: '#'
        }
    ]
};

// Configuração Inicial
let categoriaAtual = 'fotos';