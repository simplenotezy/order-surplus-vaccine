const NAME = Cypress.env('NAME') || 'Foo bar';
const AGE = Cypress.env('AGE') || 28;
const ADDRESS = Cypress.env('ADDRESS') || '';
const ZIPCITY = Cypress.env('ZIPCITY') || '';
const PHONE = Cypress.env('PHONE') || '';

// stop if test fails
afterEach(function() {
  if (this.currentTest.state === 'failed') {
    Cypress.runner.stop()
  }
});

const VACCINATION_PLACES = [
	{
		name: 'Hillerød, Østergade 8',
		inputId: 'ch_50088941-106780584'
	},
	{
		name: 'Frederikssund Hospital, Frederikssundsvej 30 (kun opskrivning  torsdag)',
		inputId: 'ch_50088941-187278225'
	}
];

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

const EMAIL_CONFIG = {
	EMAILSMTPHOST: Cypress.env('EMAILSMTPHOST'),
  	EMAILSMTPORT: Cypress.env('EMAILSMTPORT'),
  	EMAILAUTHUSER: Cypress.env('EMAILAUTHUSER'),
  	EMAILAUTHPASS: Cypress.env('EMAILAUTHPASS'),
  	FROMEMAIL: Cypress.env('FROMEMAIL'),
  	TOEMAILS: Cypress.env('TOEMAILS')?.split(',')
}

VACCINATION_PLACES.forEach((vaccinationPlace, i) => {

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
		it('Fill out firstname: ' + NAME, () => {
			const nameInputField = cy.get('.single-line input').first();
			nameInputField.type(NAME).blur();
		});
		it('Can click next after filling out first name', () => {
			const nextButton = cy.get('.next-area .next-button').first();
			nextButton.click();
		});
	
		/* age */
		it('Fill out age: ' + AGE, () => {
			const ageInputField = cy.get('.single-line input').first();
			ageInputField.type(AGE).blur();
		});
		it('Can click next after filling out age', () => {
			const nextButton = cy.get('.next-area .next-button').first();
			nextButton.click();
		});
	
		/* address */
		it('Fill out address: ' + ADDRESS, () => {
			const addressInputField = cy.get('.single-line input').first();
			addressInputField.type(ADDRESS).blur();
		});
		it('Can click next after filling out address', () => {
			const nextButton = cy.get('.next-area .next-button').first();
			nextButton.click();
		});
	
		/* zipcity */
		it('Fill out zip & city: ' + ZIPCITY, () => {
			const zipCityInputField = cy.get('.single-line input').first();
			zipCityInputField.type(ZIPCITY).blur();
		});
		it('Can click next after filling out zip & city', () => {
			const nextButton = cy.get('.next-area .next-button').first();
			nextButton.click();
		});
	
		/* phone */
		it('Fill out phone: ' + PHONE, () => {
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

		it('Can click next after chosing vaccination place', () => {
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

if (EMAIL_CONFIG.EMAILSMTPHOST) {
	describe('Sending mail to: ' + EMAIL_CONFIG.TOEMAILS.join(', '), () => {
		const places = VACCINATION_PLACES.map(x => x.name).join(', ')
		EMAIL_CONFIG.REGISTEREDTO = 'Du blev registreret til: ' + places
	
		it('Should send mail', () => {
			cy.task('sendMail', EMAIL_CONFIG).then(result => console.log(result));
			cy.wait(5000);
		});
	});
}
