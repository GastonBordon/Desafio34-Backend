const {faker} = require('@faker-js/faker')

faker.locale = 'es'

const { commerce, image} = faker

const randomData = () => {
    const productsFake = [];
	for (let i = 0; i < 5; i++) {
        const product = {
            name: commerce.product(),
			price: commerce.price(1000, 5000, 0, '$'),
			thumbnail: image.food(1234, 2345, true)
		}
		productsFake.push(product);
	}
	return productsFake;
}

module.exports = randomData;


