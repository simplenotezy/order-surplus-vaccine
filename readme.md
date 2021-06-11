# Order a Danish surplus vaccine 
I wrote this simple script to help you write your name up on the surplus vaccine program (https://www.regionh.dk/presse-og-nyt/pressemeddelelser-og-nyheder/Sider/Tilmelding-til-at-modtage-overskydende-vaccine-mod-COVID-19.aspx)

Simply edit `cypress/integration/order.js` and fill out your personal details, and the vaccination places you'd like to signup for.

You may also set cypress environment variables instead.

Personally I have a Github Action run it on schedule and have added my personal details as github secrets, so I'm automatically added to the list every day.

# Getting started
1. Fork this repository
2. Edit vaccination places in `cypress/integration/order.js`.
3. Create github secrets with your personal details
4. You're done. Github actions should run for you automatically every day (see [github/workflows/master.yml](https://github.com/simplenotezy/order-surplus-vaccine/blob/master/.github/workflows/master.yml))

# Manual
1. Run `npm install`
2. Choose vaccination places in `cypress/integration/order.js`. Use environment variables to define your personal details.
3. Run `order:vaccine`

# List of vaccination places
- ch_50088941-106780581: Ballerup, Baltorpvej 18
- ch_50088941-106780582: Bella Center, Ørestad Boulevard/Martha Christensens Vej, København S
- ch_50088941-106780583: Bornholm, Ullasvej 39 C, Rønne
- ch_50088941-106780584: Hillerød, Østergade 8
- ch_50088941-106780586: Ishøj, Vejledalen 17
- ch_50088941-106780586: Øksnehallen, Halmtorvet 11, København V
- ch_50088941-132274726: Snekkerstenhallen, Agnetevej 1
- ch_50088941-168745368: Vaccinationscenter Birkerød, Søndervangen 44, 3460 Birkerød
- ch_50088941-187278225: Frederikssund Hospital, Frederikssundsvej 30 (kun opskrivning torsdag)


# Environment variables
 - CYPRESS_NAME: Foo Bar
 - CYPRESS_AGE: 26
 - CYPRESS_ADDRESS: Your Street
 - CYPRESS_ZIPCITY: 1234 City
 - CYPRESS_PHONE: 12345678
