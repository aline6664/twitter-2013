window.onload = async function () { // para colocar await é necessário ser async
    console.log('caiu aqui') // texto que aparece no console (F12)
    const url = "https://newsapi.org/v2/everything";
    const apiKey = "6458b118fc1149fb9a38c6c24bcb2757"; // const é uma variável do js que não permite a sua alteração depois
  
    const response = await fetch(`${url}?${new URLSearchParams({ // await faz com que a leitura e execução dela seja priorizada antes do js continuar para o resto do código
      q: "brazil dev", 
      from: "2023-10-01",
      sortBy: "publishedAt",
      apiKey: apiKey, // opcional colocar o apiKey novamente depois, pode ser escrito apenas como apiKey,
    })}`, {
      method: 'GET'
    });
  
    const results = await response.json();
  
    if (results.status === 'ok') { // três iguais é quando necessita que a variável seja exatamente igual
      const divStream = document.getElementById("stream");
  
      results.articles.map(item => { // percorre todos os valores e retorna-o depois
        divStream.innerHTML += generateTweetStructure(item);
      })
    }
  }
  
  function generateTweetStructure(article) {
    const tagNameFormatted = article.author.toLowerCase().replaceAll(' ', '_'); // troca os espaços por underline e deixa minúsculo
  
    return `<div class="tweet">
      <div class="content">
        <img class="avatar" src="${article.urlToImage}" />
        <strong class="fullname">${article.author}</strong>
        <span class="username">${tagNameFormatted}</span>
  
        <p class="tweet-text">${article.description}</p>
        <div class="tweet-actions">
          <ul>
            <li><span class="icon action-reply"></span> Reply</li>
            <li><span class="icon action-retweet"></span> Retweet</li>
            <li><span class="icon action-favorite"></span> Favorite</li>
            <li><span class="icon action-more"></span> More</li>
          </ul>
        </div>
  
        <div class="stats">
          <div class="time">
            ${new Date(article.publishedAt).toLocaleDateString()}
            @
            ${new Date(article.publishedAt).toLocaleTimeString()}</div>
        </div>
      </div>
    </div>` // o ${} são variáveis
  }