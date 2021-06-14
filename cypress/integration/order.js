const NAME = 'Mia Bretlau Nybroe';
const AGE = '28';
const ADDRESS = 'Bakkesvinget 17';
const ZIPCITY = '3550 Slangerup';
const PHONE = '31148212';

// stop if test fails
afterEach(function() {
  if (this.currentTest.state === 'failed') {
    Cypress.runner.stop()
  }
});

// for a total list, check readme.md
const VACCINATION_PLACES = [
	{
		name: 'Hillerød, Østergade 8',
		inputId: 'ch_50088941-106780584'
	},
	{
		name: 'Frederikssund Hospital',
		inputId: 'ch_50088941-187278225'
	}
];

// wait 120 seconds

const now = new Date();
const night = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // the next day, ...
    0, 0, 0 // ...at 00:00:00 hours
);
const msTillMidnight = night.getTime() - now.getTime();

if (msTillMidnight < 300000) { // if less than 5 minutes to midnight. Wait
	const waitTime = msTillMidnight + 60000;
	
	describe('Wait for midnight', () => {
		it('Waits for ' + (waitTime / 1000) + ' seconds to pass...', () => {
			cy.wait(waitTime); // ms to midnight + a buffer on 60 seconds to accommodate for potential time-buffers on endsystem 
		});
	});
}

VACCINATION_PLACES.forEach((vaccinationPlace) => {

	// if(!NAME || !AGE || !ADDRESS || !ZIPCITY || !PHONE) {
	// 	Cypress.runner.stop()
	// }

	describe('Order vaccine from: ' + vaccinationPlace.name + ' for ' + NAME, () => {
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

		/* ensure vaccination list is unchanged */
		it('Is the same list as when creating this script', () => {
			const firstOption = cy.get('.closed-vertical-choice').first();
			firstOption.contains('Ballerup, Baltorpvej 18').should('be.visible');


			const lastOption = cy.get('.closed-vertical-choice').last();
			lastOption.contains('Frederikssund Hospital').should('be.visible');
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
