import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { db } from "../firebase-config.js";

async function loadPosts() {
    const grid = document.getElementById('blogGrid');
    const loading = document.getElementById('loading');

    try {
        const postsRef = collection(db, "posts");
        // Opcional: ordenar pela data de criação. Para isso funcionar no Firebase,
        // será necessário ter o campo createdAt em seus documentos.
        // const q = query(postsRef, orderBy("createdAt", "desc"));
        // await getDocs(q)
        
        // Vamos usar uma busca simples inicial para evitar erros de index que o Firestore pode gerar ao ordenar
        const querySnapshot = await getDocs(postsRef);
        
        loading.style.display = 'none';

        if (querySnapshot.empty) {
            grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--brown-light);">Nenhum artigo publicado ainda.</p>';
            return;
        }

        querySnapshot.forEach((doc) => {
            const post = doc.data();
            renderPostCard(post, grid);
        });

    } catch (error) {
        console.error("Erro ao carregar posts do Firebase: ", error);
        loading.innerHTML = 'Erro ao carregar os artigos. Tente novamente mais tarde.';
    }
}

function renderPostCard(post, gridElement) {
    const card = document.createElement('article');
    card.className = 'blog-card';
    
    // Imagem de fallback caso não tenha coverImage
    const imgUrl = post.coverImage || '../fachada.jpg';
    
    card.innerHTML = `
        <img src="${imgUrl}" alt="${post.title}" class="blog-card__img" loading="lazy">
        <div class="blog-card__content">
            <h3 class="blog-card__title">${post.title}</h3>
            <p class="blog-card__summary">${post.summary || 'Leia o artigo completo para saber mais.'}</p>
            <a href="post.html?slug=${post.slug}" class="blog-card__link">
                Ler artigo completo
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
        </div>
    `;
    
    gridElement.appendChild(card);
}

document.addEventListener('DOMContentLoaded', loadPosts);
