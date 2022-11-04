const socket = io.connect();

const authorSchema = new normalizr.schema.Entity("authors", {}, {
  idAttribute: "email"
})
const mensajeSchema = new normalizr.schema.Entity("mensaje", {
  author: authorSchema
})
const chatSchema = new normalizr.schema.Entity("chat", {
  mensajes: [mensajeSchema]
})


const button = document.getElementById("addProduct");

button.addEventListener("click", (event) => {
  let title = document.getElementById("title").value;
  let price = document.getElementById("price").value;
  let thumbnail = document.getElementById("img").value;

  socket.emit("product", { title, price, thumbnail });
});

socket.on("productos", (data) => {
  let listaProductos = "";
  data.forEach((producto) => {
    listaProductos += `
    <tr class="text-center align-middle">
        <th scope="row" class="text-center align-middle">${producto.id}</th>
        <td class="text-center align-middle">${producto.title}</td>
        <td class="text-center align-middle">$ ${producto.price}</td>
        <td class="text-center align-middle"><img src="${producto.thumbnail}" alt="${producto.title}" style="width:3rem"></td>
    </tr>
`;
  });
  document.getElementById("listadoProductos").innerHTML = listaProductos;
});

const btnEnviar = document.getElementById("btnEnviar");

btnEnviar.addEventListener("click", (event) => {
  event.preventDefault();
  let email = document.getElementById("email").value;
  let userName = document.getElementById("userName").value;
  let userSurname = document.getElementById("userSurname").value;
  let userAge = document.getElementById("userAge").value;
  let userNickname = document.getElementById("userNickname").value;
  let avatar = document.getElementById("avatar").value;
  let text = document.getElementById("text").value;
  
  if (email && text && userAge && userName && userNickname && avatar && userSurname) {
    socket.emit("nuevoMensaje", { author: { email, userName, userSurname, userAge, userNickname, avatar }, text});
  }
});

socket.on("chat", (mensajesNormalized) => {
  
  const denormalizedData = normalizr.denormalize(mensajesNormalized.result, chatSchema, mensajesNormalized.entities)
  
  const originalLength = JSON.stringify(denormalizedData).length;
  const normalizedLength= JSON.stringify(mensajesNormalized).length;
  const lengthReduction = ((originalLength-normalizedLength) /  originalLength) * 100
  
  const mensajes = denormalizedData.mensajes
  let chat = "";
  mensajes.forEach((mensaje) => {
    chat += `<li><p>
    <span class="fw-bold" style="color: blue">${mensaje.author.userNickname}:</span>
    <span style="color: green" class="fst-italic">${mensaje.text}</span> 
    </p>
    </li>
    `;
  });
  document.getElementById("mensajes").innerHTML = chat;
  document.getElementById("compresion").innerHTML = `Compresion: ${lengthReduction.toFixed(2)}%`
});


const tableProducts = document.getElementById('table-products');

const renderProducts = products => {
    if (products.length > 0) {
		tableProducts.innerHTML = '';
		products.forEach(product => {
			tableProducts.innerHTML += `
		<tr class="text-center">
			<td class="align-middle">${product.name}</td>
			<td class="align-middle">${product.price}</td>
			<td class="align-middle">
				<img src="${product.thumbnail}" alt="${product.name}" width="100px">
			</td>
		</tr>`;
		});
	}
}

socket.on('products', products => {
	renderProducts(products);
});


