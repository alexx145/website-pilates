import { collection, getDocs, query, where, limit } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { db } from "../firebase-config.js";

async function loadPost() {
    // Pegando o slug da URL (ex: post.html?slug=dor-nas-costas)
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    const loadingEl = document.getElementById('loading');

    if (!slug) {
        loadingEl.innerHTML = 'Artigo não encontrado. Retorne para a <a href="index.html">página inicial do blog</a>.';
        return;
    }

    try {
        const postsRef = collection(db, "posts");
        // Buscando o documento que tenha o campo slug igual ao slug da URL
        const q = query(postsRef, where("slug", "==", slug), limit(1));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
            loadingEl.innerHTML = 'Artigo não encontrado.';
            return;
        }
        
        const post = querySnapshot.docs[0].data();
        renderizarArtigo(post);

    } catch (error) {
        console.error("Erro ao buscar post do Firebase: ", error);
        loadingEl.innerHTML = 'Erro ao carregar o artigo. Tente novamente mais tarde.';
    }
}

function renderizarArtigo(post) {
    // 1. Atualizar SEO Meta Tags
    document.title = `${post.seoTitle || post.title} | Blog Camila Cerqueira`;
    
    // Atualizar meta description dinamicamente, se a tag existir
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
    }
    if (post.seoDescription) {
        metaDescription.setAttribute("content", post.seoDescription);
    }

    // 2. Injetar Título e Imagem
    document.getElementById('postTitle').textContent = post.title;
    
    if (post.coverImage) {
        const cover = document.getElementById('postCover');
        cover.src = post.coverImage;
        cover.alt = post.title;
        cover.style.display = 'block';
    }

    // 3. Converter Markdown do banco para HTML usando marked.js
    if (post.content) {
        const contentHtml = marked.parse(post.content);
        document.getElementById('postContent').innerHTML = contentHtml;
    } else {
        document.getElementById('postContent').innerHTML = "<p>Conteúdo não disponível.</p>";
    }

    // 4. Exibir o conteúdo
    document.getElementById('loading').style.display = 'none';
    document.getElementById('postContainer').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', loadPost);
