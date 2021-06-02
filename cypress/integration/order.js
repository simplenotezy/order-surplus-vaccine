const NAME = 'Mattias Siø Fjellvang';
const AGE = '26';
const ADDRESS = '';
const ZIPCITY = '';
const PHONE = '';

const VACCINATION_PLACES = [
	{
		name: 'Ballerup',
		inputId: 'ch_50088941-106780581'
	},
	{
		name: 'Hillerød',
		inputId: 'ch_50088941-106780584'
	},
	{
		name: 'Bella Center',
		inputId: 'ch_50088941-106780582'
	},
	{
		name: 'Øksenhallen, Halmtorvet',
		inputId: 'ch_50088941-106780586'
	}
];


VACCINATION_PLACES.forEach((vaccinationPlace) => {
	describe('Order vaccine from: ' + vaccinationPlace.name, () => {
		/* open page */
		it('Open page', () => {
			cy.wait(2000);
			cy.visit('https://www.regionh.dk/presse-og-nyt/pressemeddelelser-og-nyheder/Sider/Tilmelding-til-at-modtage-overskydende-vaccine-mod-COVID-19.aspx');
			cy.wait(500);
		});
		it('Can click next', () => {
			const nextButton = cy.get('.next-area .next-button').first();
			nextButton.click();
		});
	
		/* name */
		it('Fill out firstname', () => {
			const nameInputField = cy.get('.single-line input').first();
			nameInputField.type(NAME).blur();
		});
		it('Can click next after filling out first name', () => {
			const nextButton = cy.get('.next-area .next-button').first();
			nextButton.click();
		});
	
		/* age */
		it('Fill out age', () => {
			const ageInputField = cy.get('.single-line input').first();
			ageInputField.type(AGE).blur();
		});
		it('Can click next after filling out age', () => {
			const nextButton = cy.get('.next-area .next-button').first();
			nextButton.click();
		});
	
		/* address */
		it('Fill out address', () => {
			const addressInputField = cy.get('.single-line input').first();
			addressInputField.type(ADDRESS).blur();
		});
		it('Can click next after filling out address', () => {
			const nextButton = cy.get('.next-area .next-button').first();
			nextButton.click();
		});
	
		/* zipcity */
		it('Fill out zip & city', () => {
			const zipCityInputField = cy.get('.single-line input').first();
			zipCityInputField.type(ZIPCITY).blur();
		});
		it('Can click next after filling out zip & city', () => {
			const nextButton = cy.get('.next-area .next-button').first();
			nextButton.click();
		});
	
		/* phone */
		it('Fill out phone', () => {
			const phoneInputField = cy.get('.single-line input').first();
			phoneInputField.type(PHONE).blur();
		});
		it('Can click next after filling out phone', () => {
			const nextButton = cy.get('.next-area .next-button').first();
			nextButton.click();
		});
	
		/* choose vaccination place */
		it('Choose vaccination place', () => {
			const vaccinationRadio = cy.get('label[for="' + vaccinationPlace.inputId + '"]').first();
			vaccinationRadio.click();
		});
		it('Can click next after chosing vccination place', () => {
			const nextButton = cy.get('.next-area .next-button').first();
			nextButton.click();
		});

		/* submit form */
		it('Can submit form', () => {
			const nextButton = cy.get('.next-area .next-button').first();
			nextButton.click();
		});

		/* ensures form is submitted correctly */
		it('Ensures confirmation is visible', () => {
			cy.get('.questions .text-element strong').contains('Mange tak for din registrering').should('be.visible');
			cy.wait(5000);
		});

	});
})