// ==UserScript==
// @name TW-Inventory Reloaded B2
// @namespace WINGS
// @author Jamza
// @description Tento script zvětšuje inventář a zjednodušuje jeho třídění. Pracuji na dalších funkcích. Pokud máš nápady na vylepšení, kontaktuj mě :)
// @include https://*.the-west.*/game.php*
// @version 1.61
// @icon https://jamzask.github.io/TWInventoryReloaded/TWinventoryreloaded.ico
// @downloadURL  https://jamzask.github.io/TWInventoryReloaded/code.user.js
// @updateURL    https://jamzask.github.io/TWInventoryReloaded/code.user.js
// @grant none
// @credits Jackson, Tom Robert, neversleep1911, Sagal, Dun
// ==/UserScript==
(function(fn) {
    var script = document.createElement('script');
    script.setAttribute('type', 'application/javascript');
    script.textContent = '(' + fn + ')();';
    document.body.appendChild(script);
    document.body.removeChild(script);
})(function() {
       var TWIR = {
        version: '1.61',
        name: 'TW-Inventory Reloaded',
        author: 'Jamza',
        minGame: '2.63',
        maxGame: Game.version.toString(),
        website: 'https://jamzask.github.io/TWInventoryReloaded',
        updateUrl: 'https://jamzask.github.io/TWInventoryReloaded/update.js',
        Data: {},
        loaded: [],
		Features: {
			OpenTrader: false,
        },
        images: {
            traderImg: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wAARCAAUABQDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAAgGBAf/xAAoEAACAQMEAgEDBQAAAAAAAAABAgMEBQYABxESEyIhCBRBMTIzQkP/xAAXAQEBAQEAAAAAAAAAAAAAAAAFAwQH/8QAJREBAAIBAwQBBQEAAAAAAAAAAQIRAwAEURITITFhIjJBkaGx/9oADAMBAAIRAxEAPwCzsr3ZqcwrZ446eojpYzykVNTuY2JcIZZCrKSo/cQG9V9jyCNZbNZd1dvJhd7NFEQ0qSwLJP4lVPcPCrop5Kle3aRf7AN0AZxg9uMvXHN0qy03ZJqWakeOZZJPGfNG0aq0kRZgU6NCyOAOP4jyew45MUxHJtsIb/kWZbwPlEF9t1PLRQxUJhWCKPvKKmY9zxKxk95OVAABJYk64jk3O7nMg3RJtFOktDgugWxG3jzty5p9yeVmEgOmKfcvsvzVfCJ/lGbOfUfie5O3tBmFROszVSc+V06s3Hx7KRyrA8gr+CCNNTz9PuN33IcBlym3xVTU94vVdcKX7qDxyeGadpI2dQB1ZkZXK8AgvwfkHTT+HsyxRcmSpUWeqdIY9/vSAGDqOb9/PrXoO82DYxJFBf5rYGqFk7xOsjRtFIVA7o6FXRuPUlWHK/B5HxrB2/aDF83ySltuZVtzutGKtpoqGuuLyQRuSf8AM+sgHYhVkDhQfUDTTRnZwu5hLpLTjhK1XeqbiUT19P8ATz+/zzqobJYLVZLelut1KEiT9Ofkk/kk/knTTTV4gxF0urFo8Gv/2Q==",

		},
    };
    Inventory.uid = "inventory";
    Inventory.size = 66;
    Inventory.sizeSearch = 55;
    Inventory.sizeCustom = 55;
    Inventory.width = 608;
    Inventory.availableCategories = ['new', 'right_arm', 'left_arm', 'head', 'neck', 'body', 'belt', 'pants', 'foot', 'animal', 'yield', 'upgradeable'];
    Inventory.defaultCategory = 'new';
    Inventory.latestSize = 66;
    Inventory.context = null;
    $("<link href='https://jamzask.github.io/TWInventoryReloaded/TW-InventoryReloaded.css' rel='stylesheet' type='text/css'>").appendTo("head");
	var langs;
    langs = {
        cs_CZ: {
            customlang1: 'Aktuální jazyk',
            customlang2: 'Čeština',
            customlang3: 'Tenhle script zvětšuje inventář a vylepšuje jeho třídění.',
            customlang4: 'Kontakt',
            customlang5: 'TW Inventory Reloaded',
            customlang6: 'Update',

            customlang7: 'Aktualizace userscriptu ',
			customlang8: ', script napsán hráčem >',
			customlang9: ', je dostupná.<br><br><b>Verze: ',
            customlang10: '<b>TW Inventory Reloaded</b>',
            customlang11: 'Napiš mi ve hře',
            customlang12: 'Pošli mi email',
            customlang13: '• Dobrodružství',
            customlang14: '• Práce (PB)',
            customlang15: '• Duely',
            customlang17: '• Motivace',
            customlang16: '• Energie',
            customlang18: '• Schopnosti',
            customlang19: '• Bitvy',
            customlang20: '• Cestování',
            customlang21: '♥ Zdraví',
            customlang22: '• Výhody',
            customlang23: '• Eventy',
            customlang24: '• Poklady',
            customlang25: '❖ Výrobky',
            customlang26: '• Polní kuchař',
            customlang27: '• Mastičkář',
            customlang28: '• Kovař',
            customlang29: '• Sedlový mistr',

            customlang30: 'Nemáš tenhle typ posílení!',
            customlang31: 'Pracuji na tom...',
            customlang32: 'Hotovo...',
            customlang33: 'Kolik kusů?',
            customlang34: '<u>Všechny použitelné</u>',

            customlang35: '❖ Recepty',
            customlang36: '• Úkolové',
            customlang37: '• Vybavení',
            customlang38: '<u>Všechny polotovary</u>',
            customlang39: '❖ Karty',

            features: 'Funkce:',
            FeatOpenTrader: 'Otevřít obchodníka vždy, když změní zboží',
			save: 'Uložit',
			saveMessage: 'Nastavení úspěšně uloženo.',
			settings: 'Nastavení',
			ghostTown: '• Město duchů',
			indianVillage: '• Indiánská rezervace',
			monday: '• Pondelí',
			tuesday: '• Úterý',
			wednesday: '• Středa',
			thursday: '• Čtvrtek',
			friday: '• Pátek',
			saturday: '• Sobota',
			sunday: '• Neděle',
			saloon: '• Saloon',
			shortName: 'TWIR',
			dailyItems: 'Denní úkoly [v1.0]',
			showDailyItems: 'Ukaž produkty na denní úkoly',
            seName: 'TW Inventory Reloaded - Nastavení',
            seSname: 'TWIR - Nastavení',
            duName: 'Produkty pro denní úkoly',
            duSname: 'DÚ - Produkty',
            Differ: {
                tip: 'Zobrazit pouze: Duplikáty',
                bug: '<i>Pro zobrazení je někdy nutné kliknout 2x.</i>',
                upgradeable: '• Vylepšitelné',
                noset: '• Kromě setů',
                sellable: '• Prodejní',
                auctionable: '• Dražitelné',
                tipuse: 'Zobrazit pouze: Použitelné',
                tiprecipe: 'Zobrazit pouze: Rěmeslo',
                tipsets: 'Zobrazit pouze: Soupravy',
                vsecko_sado: 'Všechny soupravy',
                vsecko_duplikato: '<u>Všechny duplikáty</u>',
                kalkulator: '$ u obchodníka',
                wip: '<b>W.I.P.</b><br> Na tomhle se pracuje!',
                twcalc: '<b>The-West Calc</b> <br>Importovat data do TW-Calc.',
                uspechy: '<b>Otisky na úspěchy</b> <br>Zobrazit chybějící předměty potřebné k úspěchům.',
                sbirky: '<b>Osobní sbírky</b> <br>Zobrazit chybějící soupravy do tvé osobní sbírky.',
				ukoly: '<b>Denní úkoly</b> <i>v1.0</i> <br>Zobrazit chybějící produkty pro denní úkoly.',
                miss: "Chybí : ",
                colTabTitle: 'Otisky na úspěchy',
                setTabTitle: "Osobní sbírky",
                thText: '%1 chybějících předmětů',
                thEncours: 'Máš nabídku na tenhle předmět',
                thFetch: 'Tenhle přemět můžeš vyzvednout na trhu %1',
                allOpt: '<u>Všechny</u>',
                collectionFilterTip: 'Ukázat jenom předměty do sbírek',
                collectionFilterLabel: 'Jenom sběratelské',
                select: 'Podle názvu ...',
                listText: 'Chybějící otisky:',
                listSetText: 'Chybějící soupravy:',
                filters: '',
                atTrader: 'Dostupné u obchodníka',
                atBid: 'Ukončené dražby',
                atCurBid: 'Probíhajíci dražby',
                atTraderTitle: 'Ukázat jenom přeměty, které právě prodává obchodník',
                atBidTitle: 'Ukázat jenom přeměty, které jsi vydražil/a na trhu',
                atCurBidTitle: 'Ukázat jenom přeměty, které právě dražíš na trhu',
                searchMarket: 'Hledat na trhu',
                title: 'Itemy potřebné na dokončení sbírky',
            }
        },
        sk_SK: {
            customlang1: 'Aktuálny jazyk',
            customlang2: 'Slovenčina',
            customlang3: 'Tento script zväčšuje inventár a vylepšuje jeho triedenie.',
            customlang4: 'Kontakt',
            customlang5: '<b>TW Inventory Reloaded</b>',
            customlang6: 'Update',

            customlang7: 'Aktualizácia userscriptu ',
			customlang8: ', script napísaný hráčom >',
			customlang9: ', je dostupná.<br><br><b>Verzia: ',
            customlang10: 'TW Inventory Reloaded',
            customlang11: 'Napíš mi v hre',
            customlang12: 'Pošli mi email',
            customlang13: 'Dobrodružstvá',
            customlang14: '• Práce (PB)',
            customlang15: '• Duely',
            customlang17: '• Motivácia',
            customlang16: '• Energia',
            customlang18: '• Schopnosti',
            customlang19: '• Boje',
            customlang20: '• Cestovanie',
            customlang21: '♥ Zdravie',
            customlang22: '• Výhody',
            customlang23: '• Eventy',
            customlang24: '• Poklady',
            customlang25: '❖ Výrobky',
            customlang26: '• Poľný kuchár',
            customlang27: '• Mastičkár',
            customlang28: '• Kováč',
            customlang29: '• Majster sedla',

            customlang30: 'Nemáš tento typ produktu!',
            customlang31: 'Pracujem na tom...',
            customlang32: 'Hotovo...',
            customlang33: 'Koľko kusov?',
            customlang34: '<u>Všetky použiteľné</u>',

            customlang35: '❖ Recepty',
            customlang36: '• Úlohové',
            customlang37: '• Výbava',
            customlang38: '<u>Všetky polotovary</u>',
            customlang39: '❖ Karty',

            features: 'Features',
			FeatDailyItemHelper: 'Adds a new button in the side menu for daily quest items',
			save: 'Save',
			saveMessage: 'Settings saved',
			settings: 'Settings',
			ghostTown: '• Mesto duchov',
			indianVillage: '• Indiánska dedina',
			monday: '• Pondelok',
			tuesday: '• Utorok',
			wednesday: '• Streda',
			thursday: '• Štvrtok',
			friday: '• Piatok',
			saturday: '• Sobota',
			sunday: '• Nedeľa',
			saloon: '• Saloon',
			shortName: 'TWIR',
			dailyItems: 'Denné úlohy [v1.0]',
			showDailyItems: 'Ukáž produkty pre denné úlohy',
            seName: 'TW Inventory Reloaded - Nastavení',
            seSname: 'TWIR - Nastavení',
            duName: 'Produkty pre denné úlohy',
            duSname: 'DÚ - Produkty',
            Differ: {
                tip: 'Zobraziť iba: Duplikáty',
                bug: '<i>Pre zobrazenie je niekedy nutné klinút 2x.</i>',
                upgradeable: '• Vylepšiteľné',
                noset: '• Okrem setov',
                sellable: '• Predajné',
                auctionable: '• Dražiteľné',
                tipuse: 'Zobraziť iba: Použiteľné',
                tiprecipe: 'Zobraziť iba: Remeslo',
                tipsets: 'Zobraziť iba: Súpravy',
                vsecko_sado: 'Všetky súpravy',
                vsecko_duplikato: '<u>Všetky duplikáty</u>',
                kalkulator: '$ u obchodníka',
                wip: '<b>W.I.P.</b><br> Na tomto sa pracuje!',
                twcalc: '<b>The-West Calc</b> <br>Importovať dáta do TW-Calc.',
                uspechy: '<b>Otisk na úspechy</b> <br>Zobraziť chýbajúce predmety potrebné na úspechy.',
                sbirky: '<b>Osobné zbierky</b> <br>Zobraziť chýbajúce súpravy do tvojej osobnej zbierky.',
				ukoly: '<b>Denné úlohy</b> <i>v1.0</i> <br>Zobraziť chýbajúce produkty pre denné úlohy.',
                miss: "Chýba : ",
                colTabTitle: 'Otisky na úspechy',
                setTabTitle: "Osobné zbierky",
                thText: '%1 chýbajúcich predmetov',
                thEncours: 'Máš ponuku na tento predmet',
                thFetch: 'Tento predmet môžeš vyzdvihnúť na trhu %1',
                allOpt: '<u>Všetky</u>',
                collectionFilterTip: 'Ukázať len predmety do zbierky',
                collectionFilterLabel: 'Len zberateľské',
                select: 'Podľa názvu ...',
                listText: 'Chýbajúce otisky:',
                listSetText: 'Chýbajúce súpravy:',
                filters: '',
                atTrader: 'Dostupné u obchodníka',
                atBid: 'Ukončené dražby',
                atCurBid: 'Prebiehajúce dražby',
                atTraderTitle: 'Ukázať len predmety, ktoré predáva obchodník',
                atBidcustomTitle: 'Ukázat len predmety, ktoré si vydražil/a na trhu',
                atCurBidTitle: 'Ukázať len predmety, ktoré práve dražíš na trhu',
                searchMarket: 'Hľadať na trhu',
                title: 'Itemy potrebné na dokončenie zbierky',
            }
        },
    };
    var TWIRlang = langs.hasOwnProperty(Game.locale) ? langs[Game.locale] : langs.cs_CZ;
    var TWIRApi = TheWestApi.register('TWIR', TWIRlang.customlang5, TWIR.minGame, TWIR.maxGame, TWIR.author, TWIR.website);
    TWIRApi.setGui('<br><i>' + TWIRlang.customlang1 + ': </i>' + TWIRlang.customlang2 + '<br><br>' + TWIRlang.customlang3 + '<br><br><i>' + TWIRlang.customlang10 + ' v' + TWIR.version + '</i><br><br>' + TWIRlang.customlang4 + ':</b><ul style="margin-left:15px;"><li>' + TWIRlang.customlang11 + '<a  style="margin-left:15px;" href="javascript:void(PlayerProfileWindow.open(746376));">Jamza (CZ14)</a>' + '</li><li>' + TWIRlang.customlang12 + '<a  style="margin-left:15px;" href="mailto:97jamza@gmail.com">97jamza@gmail.com</a>' + '</li></ul>');
    var featky = {
        init: function () {
			featky.updateFeat();
        },
        updateFeat: function () {
			var saved = localStorage.getItem('TWIRFeaturestest');
			TWIR.Data = saved && saved.indexOf('{') === 0 && JSON.parse(saved) || {};
			for (var k in TWIR.Features) {
				if (featky.getFeature(k) && !TWIR.loaded.includes(k)) {
				  try {
					TWIR.loaded.push(k);
					TWIR[k].init();
				  } catch (e) {}
				}
			}
        },
        getFeature: function (name) {
          return (TWIR.Data[name] !== undefined) ? TWIR.Data[name] : TWIR.Features[name];
        },
    };
    var GUI = {
		openMenu: function () {
			DailyItemHelper.showDailyItems();
            GUI.open();
            GUI.openSettings();
        },
		window: {},
        checkbox: {},
		open: function () {
			GUI.window = wman.open('TWIRMenuWindow', TWIRlang.duName, 'noreload').setMiniTitle(TWIRlang.duSname).setMaxSize(1268, 838);
			GUI.window.addTab(TWIRlang.dailyItems, 'TWIRDailyItemsTab', DailyItemHelper.showDailyItems);
        },
		opens: function () {
			GUI.window = wman.open('TWIRMenuWindow', TWIRlang.seName, 'noreload').setMiniTitle(TWIRlang.seSname).setMaxSize(1268, 838);
            GUI.window.addTab(TWIRlang.settings, 'TWIRSettingsTab', GUI.openSettings);
        },

        getDefault: function (tab) {
			GUI.window.setResizeable(false).setSize(748, 471).clearContentPane().removeClass('nocloseall');
			GUI.window.dontCloseAll = false;
			$(GUI.window.getContentPane()).css('margin-top', '10px');
			var wnd = GUI.window.getMainDiv();
			$('.textart_Title', wnd).css('display', '');
			GUI.window.activateTab(tab);
        },
          openSettings: function () {
            GUI.opens();
			GUI.getDefault('TWIRSettingsTab');

			var featScroll = new west.gui.Scrollpane();

			featScroll.appendContent('<h2>' + TWIRlang.features + '</h2>');
			for (var k in TWIR.Features) {
				GUI.checkbox[k] = new west.gui.Checkbox().setLabel(TWIRlang['Feat' + k]).setSelected(featky.getFeature(k)).appendTo(featScroll.getContentPane());

				featScroll.appendContent('<br><div style="height:5px;" />');
			}
			featScroll.appendContent('<br>');
			$(featScroll.getMainDiv()).css({
				'height': '310px',
				'margin-bottom': '10px',
			});
			var button = new west.gui.Button(TWIRlang.save, function () {
				for (var k in GUI.checkbox) {
					TWIR.Data[k] = GUI.checkbox[k].isSelected();
				}
				localStorage.setItem('TWIRFeaturestest', JSON.stringify(TWIR.Data));
				featky.updateFeat();
				new UserMessage(TWIRlang.saveMessage, 'success').show();
            });
			$(GUI.window.getContentPane()).append(featScroll.getMainDiv()).append(button.getMainDiv());
        },
	};

	 var DailyItemHelper = {

		ghostTown: [
			{minLevel: 21, maxLevel: 50, amount: 1, profession: 100, itemID: 715000},
			{minLevel: 27, maxLevel: 60, amount: 1, profession: 100, itemID: 760000},
			{minLevel: 28, maxLevel: 60, amount: 1, profession: 100, itemID: 759000},
			{minLevel: 37, maxLevel: 70, amount: 1, profession: 100, itemID: 792000},
			{minLevel: 62, maxLevel: 100, amount: 1, profession: 100, itemID: 794000},
			{minLevel: 73, maxLevel: 150, amount: 1, profession: 100, itemID: 1817000},
			{minLevel: 80, maxLevel: 150, amount: 1, profession: 100, itemID: 1819000},
			{minLevel: 120, maxLevel: 150, amount: 4, profession: 100, itemID: 2442000},
		],
		indianVillage: [
			{minLevel: 13, maxLevel: 40, amount: 1, profession: 100, itemID: 714000},
			{minLevel: 34, maxLevel: 60, amount: 1, profession: 100, itemID: 718000},
			{minLevel: 41, maxLevel: 70, amount: 1, profession: 100, itemID: 724000},
			{minLevel: 50, maxLevel: 80, amount: 1, profession: 100, itemID: 1812000},
			{minLevel: 56, maxLevel: 80, amount: 1, profession: 100, itemID: 1813000},
			{minLevel: 63, maxLevel: 100, amount: 1, profession: 100, itemID: 1708000},
			{minLevel: 71, maxLevel: 150, amount: 1, profession: 100, itemID: 780000},
			{minLevel: 90, maxLevel: 150, amount: 1, profession: 100, itemID: 1821000},
			{minLevel: 100, maxLevel: 150, amount: 1, profession: 100, itemID: 1826000},
			{minLevel: 120, maxLevel: 150, amount: 1, profession: 100, itemID: 2441000},
		],
		daily: {
			sunday: [
				{minLevel: 13, maxLevel: 47, amount: 1, profession: 100, itemID: 716000},
				{minLevel: 15, maxLevel: 43, amount: 1, profession: 100, itemID: 742000},
				{minLevel: 17, maxLevel: 51, amount: 1, profession: 100, itemID: 720000},
				{minLevel: 37, maxLevel: 80, amount: 1, profession: 100, itemID: 792000},
				{minLevel: 48, maxLevel: 80, amount: 1, profession: 100, itemID: 719000},
				{minLevel: 52, maxLevel: 69, amount: 1, profession: 100, itemID: 768000},
				{minLevel: 81, maxLevel: 150, amount: 1, profession: 100, itemID: 1708000},
				{minLevel: 81, maxLevel: 150, amount: 1, profession: 100, itemID: 751000},
				{minLevel: 120, maxLevel: 150, amount: 5, profession: 100, itemID: 2447000},
				{minLevel: 120, maxLevel: 150, amount: 1, profession: 100, itemID: 2430000},
			],
			monday: [
				{minLevel: 3, maxLevel: 46, amount: 1, profession: 100, itemID: 702000},
				{minLevel: 26, maxLevel: 40, amount: 1, profession: 100, itemID: 761000},
				{minLevel: 27, maxLevel: 36, amount: 1, profession: 100, itemID: 760000},
				{minLevel: 38, maxLevel: 64, amount: 1, profession: 100, itemID: 792000},
				{minLevel: 65, maxLevel: 150, amount: 1, profession: 100, itemID: 1814000},
				{minLevel: 71, maxLevel: 150, amount: 1, profession: 100, itemID: 780000},
				{minLevel: 120, maxLevel: 150, amount: 1, profession: 100, itemID: 2444000},
			],
			tuesday: [
				{minLevel: 11, maxLevel: 57, amount: 1, profession: 100, itemID: 766000},
				{minLevel: 45, maxLevel: 80, amount: 1, profession: 100, itemID: 778000},
				{minLevel: 81, maxLevel: 150, amount: 1, profession: 100, itemID: 1818000},
				{minLevel: 81, maxLevel: 150, amount: 1, profession: 100, itemID: 756000},
				{minLevel: 120, maxLevel: 150, amount: 5, profession: 100, itemID: 2456000},
				{minLevel: 120, maxLevel: 150, amount: 2, profession: 100, itemID: 2450000},
			],
			wednesday: [
				{minLevel: 4, maxLevel: 67, amount: 1, profession: 100, itemID: 700000},
				{minLevel: 15, maxLevel: 49, amount: 1, profession: 100, itemID: 791000},
				{minLevel: 18, maxLevel: 49, amount: 1, profession: 100, itemID: 767000},
				{minLevel: 48, maxLevel: 79, amount: 1, profession: 100, itemID: 1812000},
				{minLevel: 120, maxLevel: 150, amount: 1, profession: 100, itemID: 2434000},
				{minLevel: 120, maxLevel: 150, amount: 1, profession: 100, itemID: 2449000},
			],
			thursday: [
				{minLevel: 8, maxLevel: 56, amount: 1, profession: 100, itemID: 708000},
				{minLevel: 28, maxLevel: 58, amount: 1, profession: 100, itemID: 759000},
				{minLevel: 59, maxLevel: 74, amount: 1, profession: 100, itemID: 752000},
				{minLevel: 63, maxLevel: 87, amount: 1, profession: 100, itemID: 1708000},
				{minLevel: 75, maxLevel: 150, amount: 1, profession: 100, itemID: 730000},
				{minLevel: 120, maxLevel: 150, amount: 3, profession: 100, itemID: 2433000},
			],
			friday: [
				{minLevel: 3, maxLevel: 61, amount: 1, profession: 100, itemID: 705000},
				{minLevel: 21, maxLevel: 42, amount: 1, profession: 100, itemID: 715000},
				{minLevel: 42, maxLevel: 75, amount: 1, profession: 100, itemID: 1811000},
				{minLevel: 62, maxLevel: 88, amount: 1, profession: 100, itemID: 794000},
				{minLevel: 89, maxLevel: 150, amount: 1, profession: 100, itemID: 1824000},
				{minLevel: 120, maxLevel: 150, amount: 1, profession: 100, itemID: 2451000},
				{minLevel: 129, maxLevel: 150, amount: 2, profession: 100, itemID: 2453000},
			],
			saturday: [
				{minLevel: 5, maxLevel: 41, amount: 1, profession: 100, itemID: 707000},
				{minLevel: 5, maxLevel: 51, amount: 1, profession: 100, itemID: 1807000},
				{minLevel: 35, maxLevel: 53, amount: 1, profession: 100, itemID: 737000},
				{minLevel: 42, maxLevel: 75, amount: 1, profession: 100, itemID: 725000},
				{minLevel: 52, maxLevel: 77, amount: 1, profession: 100, itemID: 768000},
				{minLevel: 76, maxLevel: 150, amount: 1, profession: 100, itemID: 1756000},
				{minLevel: 78, maxLevel: 150, amount: 1, profession: 100, itemID: 1819000},
				{minLevel: 79, maxLevel: 150, amount: 1, profession: 100, itemID: 764000},
				{minLevel: 81, maxLevel: 150, amount: 1, profession: 100, itemID: 794000},
				{minLevel: 120, maxLevel: 150, amount: 5, profession: 100, itemID: 2435000},
			],
		},
		others: [
			{minLevel: 0, maxLevel: 150, amount: 15, profession: 100, itemID: 2160000},
			{minLevel: 0, maxLevel: 150, amount: 15, profession: 100, itemID: 2161000},
			{minLevel: 0, maxLevel: 150, amount: 15, profession: 100, itemID: 2162000},
			{minLevel: 0, maxLevel: 150, amount: 15, profession: 100, itemID: 2163000},

			{minLevel: 20, maxLevel: 150, amount: 1, profession: 1, itemID: 1940000},
			{minLevel: 20, maxLevel: 150, amount: 1, profession: 1, itemID: 1871000},
			{minLevel: 20, maxLevel: 150, amount: 1, profession: 1, itemID: 1879000},

			{minLevel: 20, maxLevel: 150, amount: 1, profession: 2, itemID: 1939000},
			{minLevel: 20, maxLevel: 150, amount: 1, profession: 2, itemID: 1890000},
			{minLevel: 20, maxLevel: 150, amount: 1, profession: 2, itemID: 1898000},

			{minLevel: 20, maxLevel: 150, amount: 1, profession: 3, itemID: 1938000},
			{minLevel: 20, maxLevel: 150, amount: 1, profession: 3, itemID: 1910000},
			{minLevel: 20, maxLevel: 150, amount: 1, profession: 3, itemID: 1916000},

			{minLevel: 20, maxLevel: 150, amount: 1, profession: 4, itemID: 1937000},
			{minLevel: 20, maxLevel: 150, amount: 1, profession: 4, itemID: 1928000},
			{minLevel: 20, maxLevel: 150, amount: 1, profession: 4, itemID: 1934000},
		],


		getQuestsFromArray: function(questArray) {
			var text = '';
			for (var i = 0; i < questArray.length; i++) {
				var quest = questArray[i];
				if(quest.profession == 100 || quest.profession == Character.professionId) {
					if(quest.minLevel <= Character.level && Character.level <= quest.maxLevel ){
						var color = 'black';
						if(Bag.getItemCount(quest.itemID) < quest.amount){
							color = 'red';
						}
						text += '<span style="font-weight: bold; text-shadow: 0 0 3px rgba(255, 255, 255, 0.9); color: ' + color + '";>' + ItemManager.get(quest.itemID).name + ' ' +Bag.getItemCount(quest.itemID) + '/' + quest.amount + '</span>, ';
					}
				}
			}
			return text;
		},

		showDailyItems: function() {
            GUI.open();
			GUI.getDefault('TWIRDailyItemsTab');

			var scrollPane = new west.gui.Scrollpane();
			$(scrollPane.getMainDiv()).css({
				'height': '380px',
			});

			scrollPane.appendContent('<div id="dropdown-1" class="dropdown dropdown-processed" style="padding: 7px 10px 7px 10px;border-radius: 8px;box-shadow: 0 0 20px inset;opacity: 0.9;width: 600px;background-image: url(https://jamzask.github.io/TWInventoryReloaded/bg/bgSL.png);background-repeat: no-repeat;background-size: 100% 105%;margin-left: 35px;"><a class="dropdown-link" style="font-size: 12pt; padding-left: 25px;" href="#">'+TWIRlang.saloon +'</a><br><div class="dropdown-container" style="display: none;"><ul>'+DailyItemHelper.getQuestsFromArray(DailyItemHelper.others)+'</ul></div></div>');
			scrollPane.appendContent('<div id="dropdown-2" class="dropdown dropdown-processed" style="padding: 7px 10px 7px 10px;border-radius: 8px;box-shadow: 0 0 20px inset;opacity: 0.9;width: 600px;background-image: url(https://jamzask.github.io/TWInventoryReloaded/bg/bgIV.png);background-repeat: no-repeat;background-size: 100% 105%;margin-left: 35px;"><a class="dropdown-link" style="font-size: 12pt; padding-left: 25px;" href="#">'+TWIRlang.indianVillage +'</a><br><div class="dropdown-container" style="display: none;"><ul>'+DailyItemHelper.getQuestsFromArray(DailyItemHelper.indianVillage)+'</ul></div></div>');
			scrollPane.appendContent('<div id="dropdown-3" class="dropdown dropdown-processed" style="padding: 7px 10px 7px 10px;border-radius: 8px;box-shadow: 0 0 20px inset;opacity: 0.9;width: 600px;background-image: url(https://jamzask.github.io/TWInventoryReloaded/bg/bgMD.png);background-repeat: no-repeat;background-size: 100% 105%;margin-left: 35px;"><a class="dropdown-link" style="font-size: 12pt; padding-left: 25px;" href="#">'+TWIRlang.ghostTown + '</a><br><div class="dropdown-container" style="display: none;"><ul>'+DailyItemHelper.getQuestsFromArray(DailyItemHelper.ghostTown)+'</ul></div></div>');
			scrollPane.appendContent('<div id="dropdown-4" class="dropdown dropdown-processed" style="padding: 7px 10px 7px 10px;border-radius: 8px;box-shadow: 0 0 20px inset;opacity: 0.9;width: 600px;background-image: url(https://jamzask.github.io/TWInventoryReloaded/bg/bgCL.png);background-repeat: no-repeat;background-size: 100% 105%;margin-left: 35px;"><a class="dropdown-link" style="font-size: 12pt; padding-left: 25px;" href="#">'+TWIRlang.monday + '</a><br><div class="dropdown-container" style="display: none;"><ul>'+DailyItemHelper.getQuestsFromArray(DailyItemHelper.daily.monday)+'</ul></div></div>');
			scrollPane.appendContent('<div id="dropdown-5" class="dropdown dropdown-processed" style="padding: 7px 10px 7px 10px;border-radius: 8px;box-shadow: 0 0 20px inset;opacity: 0.9;width: 600px;background-image: url(https://jamzask.github.io/TWInventoryReloaded/bg/bgCL.png);background-repeat: no-repeat;background-size: 100% 105%;margin-left: 35px;"><a class="dropdown-link" style="font-size: 12pt; padding-left: 25px;" href="#">'+TWIRlang.tuesday + '</a><br><div class="dropdown-container" style="display: none;"><ul>'+DailyItemHelper.getQuestsFromArray(DailyItemHelper.daily.tuesday)+'</ul></div></div>');
			scrollPane.appendContent('<div id="dropdown-6" class="dropdown dropdown-processed" style="padding: 7px 10px 7px 10px;border-radius: 8px;box-shadow: 0 0 20px inset;opacity: 0.9;width: 600px;background-image: url(https://jamzask.github.io/TWInventoryReloaded/bg/bgCL.png);background-repeat: no-repeat;background-size: 100% 105%;margin-left: 35px;"><a class="dropdown-link" style="font-size: 12pt; padding-left: 25px;" href="#">'+TWIRlang.wednesday + '</a><br><div class="dropdown-container" style="display: none;"><ul>'+DailyItemHelper.getQuestsFromArray(DailyItemHelper.daily.wednesday)+'</ul></div></div>');
			scrollPane.appendContent('<div id="dropdown-7" class="dropdown dropdown-processed" style="padding: 7px 10px 7px 10px;border-radius: 8px;box-shadow: 0 0 20px inset;opacity: 0.9;width: 600px;background-image: url(https://jamzask.github.io/TWInventoryReloaded/bg/bgCL.png);background-repeat: no-repeat;background-size: 100% 105%;margin-left: 35px;"><a class="dropdown-link" style="font-size: 12pt; padding-left: 25px;" href="#">'+TWIRlang.thursday + '</a><br><div class="dropdown-container" style="display: none;"><ul>'+DailyItemHelper.getQuestsFromArray(DailyItemHelper.daily.thursday)+'</ul></div></div>');
			scrollPane.appendContent('<div id="dropdown-8" class="dropdown dropdown-processed" style="padding: 7px 10px 7px 10px;border-radius: 8px;box-shadow: 0 0 20px inset;opacity: 0.9;width: 600px;background-image: url(https://jamzask.github.io/TWInventoryReloaded/bg/bgCL.png);background-repeat: no-repeat;background-size: 100% 105%;margin-left: 35px;"><a class="dropdown-link" style="font-size: 12pt; padding-left: 25px;" href="#">'+TWIRlang.friday + '</a><br><div class="dropdown-container" style="display: none;"><ul>'+DailyItemHelper.getQuestsFromArray(DailyItemHelper.daily.friday)+'</ul></div></div>');
			scrollPane.appendContent('<div id="dropdown-9" class="dropdown dropdown-processed" style="padding: 7px 10px 7px 10px;border-radius: 8px;box-shadow: 0 0 20px inset;opacity: 0.9;width: 600px;background-image: url(https://jamzask.github.io/TWInventoryReloaded/bg/bgCL.png);background-repeat: no-repeat;background-size: 100% 105%;margin-left: 35px;"><a class="dropdown-link" style="font-size: 12pt; padding-left: 25px;" href="#">'+TWIRlang.saturday + '</a><br><div class="dropdown-container" style="display: none;"><ul>'+DailyItemHelper.getQuestsFromArray(DailyItemHelper.daily.saturday)+'</ul></div></div>');
			scrollPane.appendContent('<div id="dropdown-10" class="dropdown dropdown-processed" style="padding: 7px 10px 7px 10px;border-radius: 8px;box-shadow: 0 0 20px inset;opacity: 0.9;width: 600px;background-image: url(https://jamzask.github.io/TWInventoryReloaded/bg/bgCL.png);background-repeat: no-repeat;background-size: 100% 105%;margin-left: 35px;"><a class="dropdown-link" style="font-size: 12pt; padding-left: 25px;" href="#">'+TWIRlang.sunday + '</a><br><div class="dropdown-container" style="display: none;"><ul>'+DailyItemHelper.getQuestsFromArray(DailyItemHelper.daily.sunday)+'</ul></div></div><br>');




			$(GUI.window.getContentPane()).append(scrollPane.getMainDiv());
            $('div.dropdown').each(function() {
    var $dropdown = $(this);

    $("a.dropdown-link", $dropdown).click(function(e) {
      e.preventDefault();
      $div = $("div.dropdown-container", $dropdown);
      $div.toggle();
      $("div.dropdown-container").not($div).hide();
      return false;
    });

});
		},
    };

    var TW_Sets = [{

        name: TWIRlang.customlang34,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/blind.png',
        items: [2196000, 2197000, 2198000, 2199000, 2200000, 2467000, 2576000, 2732000, 50113000, 2201000, 2202000, 2203000, 2204000, 2205000, 2247000, 2248000, 2249000, 2250000, 2251000, 2270000, 2290000, 2314000, 2318000, 2322000, 2326000, 2421000, 2465000, 2468000, 2472000, 2475000, 2478000, 2481000, 2491000, 2493000, 2495000, 2497000, 2559000, 2560000, 2738000, 21343000, 251000, 770000, 772000, 773000, 774000, 775000, 776000, 796000, 799000, 995000, 996000, 1016000, 1019000, 1700000, 1701000, 1702000, 1703000, 1704000, 1706000, 1707000, 1709000, 1710000, 1711000, 1712000, 1750000, 1751000, 1752000, 1753000, 1754000, 1757000, 1758000, 1760000, 1761000, 1763000, 1764000, 1765000, 1766000, 1767000, 1768000, 1769000, 1770000, 1771000, 1773000, 1774000, 1775000, 1776000, 1777000, 1778000, 1779000, 1780000, 1781000, 1782000, 1783000, 1784000, 1785000, 1786000, 1789000, 1790000, 1792000, 1793000, 1794000, 1795000, 1796000, 1797000, 1798000, 1799000, 1800000, 1801000, 1802000, 1803000, 1804000, 1805000, 1806000, 1838000, 1839000, 1840000, 1841000, 1842000, 1843000, 1844000, 1845000, 1846000, 1847000, 1848000, 1849000, 1850000, 1851000, 1852000, 1853000, 1854000, 1935000, 1936000, 1953000, 1954000, 1956000, 1957000, 1958000, 1959000, 1962000, 1963000, 1964000, 1965000, 1966000, 1973000, 1992000, 1993000, 1994000, 1995000, 1996000, 2001000, 2004000, 2007000, 2010000, 2145000, 2146000, 2147000, 2148000, 2153000, 2224000, 2245000, 2265000, 2266000, 2267000, 2306000, 2307000, 2308000, 2309000, 2328000, 2340000, 2346000, 2347000, 2348000, 2349000, 2350000, 2351000, 2364000, 2365000, 2366000, 2367000, 2368000, 2369000, 2370000, 2371000, 2372000, 2373000, 2374000, 2375000, 2376000, 2377000, 2378000, 2386000, 2387000, 2388000, 2389000, 2390000, 2392000, 2398000, 2399000, 2400000, 2401000, 2402000, 2403000, 2404000, 2405000, 2406000, 2407000, 2408000, 2410000, 2411000, 2412000, 2413000, 2414000, 2415000, 2416000, 2417000, 2418000, 2419000, 2420000, 2421000, 2422000, 2424000, 2425000, 2426000, 2427000, 2428000, 2429000, 2500000, 2501000, 2502000, 2503000, 2504000, 2505000, 2506000, 2508000, 2509000, 2510000, 2511000, 2512000, 2513000, 2514000, 2515000, 2532000, 2552000, 2553000, 2554000, 2568000, 2569000, 2570000, 2571000, 2572000, 2573000, 2574000, 2575000, 2681000, 2682000, 2683000, 2702000, 2703000, 2704000, 2705000, 2708000, 2709000, 2710000, 2711000, 2712000, 2713000, 2729000, 12707000, 12708000, 17020000, 17021000, 17022000, 17023000, 17024000, 17025000, 17026000, 17027000, 50091000, 50094000, 50172000, 50173000, 50174000, 50175000, 50176000, 50178000, 50179000, 50180000, 50181000, 50182000, 50183000, 50184000, 50185000, 50186000, 50196000, 50197000, 50198000, 50199000, 50200000, 50201000, 50202000, 50203000, 50204000, 50207000, 50208000, 50209000, 50271000, 50272000, 50273000, 50274000, 50275000, 50276000, 50277000, 50278000, 50317000, 50318000, 50319000, 50320000, 50321000, 50322000, 50349000, 50350000, 50351000, 50352000, 50369000, 50389000, 50429000, 50430000, 50431000, 50489000, 50490000, 50491000, 50492000, 50493000, 50494000, 50495000, 50496000, 50497000, 50498000, 50499000, 50500000, 50546000, 50548000, 50566000, 50609000, 50610000, 50611000, 50612000, 50613000, 252000, 674000, 723000, 768000, 792000, 794000, 797000, 945000, 979000, 991000, 997000, 998000, 999000, 1702000, 1715000, 1717000, 1740000, 1759000, 1762000, 1772000, 1955000, 1972000, 2154000, 2188000, 2189000, 2190000, 2191000, 2223000, 2228000, 2301000, 2302000, 2339000, 2352000, 2363000, 2409000, 2483000, 2539000, 2541000, 2551000, 2555000, 2577000, 2578000, 2583000, 2600000, 2610000, 2611000, 2612000, 2613000, 2640000, 2641000, 2642000, 2643000, 2644000, 2649000, 2660000, 2661000, 2662000, 2663000, 2684000, 2691000, 2696000, 2697000, 2716000, 2717000, 2718000, 2719000, 2720000, 2724000, 2725000, 2726000, 2727000, 12713000, 50000000, 50016000, 50076000, 50089000, 50090000, 50092000, 50107000, 50109000, 50111000, 50112000, 50137000, 50145000, 50153000, 50161000, 50194000, 50206000, 50243000, 50279000, 50292000, 50313000, 50323000, 50331000, 50342000, 50353000, 50377000, 50402000, 50422000, 50432000, 50464000, 50502000, 50510000, 50511000, 50512000, 50513000, 50514000, 50515000, 50516000, 50517000, 50518000, 50519000, 50520000, 50521000, 50522000, 50523000, 50524000, 50525000, 50526000, 50527000, 50528000, 50529000, 50530000, 50531000, 50532000, 50533000, 50534000, 50535000, 50536000, 50537000, 50538000, 50539000, 50544000, 50549000, 50555000, 50569000, 50578000, 50587000, 50596000, 50621000, 50626000, 50635000, 50661000, 50671000, 50480000, 50481000, 50482000, 50483000, 50484000, 50485000, 50486000, 50487000, 371000, 374000, 376000, 377000, 378000, 379000, 852000, 853000, 926000, 927000, 928000, 973000, 974000, 975000, 976000, 1003000, 1838000, 1868000, 1869000, 1878000, 1887000, 1888000, 1897000, 1905000, 1906000, 1915000, 1923000, 1924000, 1933000, 1960000, 1961000, 1964000, 1967000, 1975000, 1976000, 2131000, 2132000, 2133000, 2134000, 2136000, 2137000, 2138000, 2139000, 2144000, 2152000, 2172000, 2173000, 2174000, 2175000, 2176000, 2187000, 2192000, 2193000, 2194000, 2195000, 2196000, 2197000, 2198000, 2199000, 2200000, 2201000, 2202000, 2203000, 2204000, 2205000, 2226000, 2227000, 2297000, 2298000, 2299000, 2300000, 2305000, 2329000, 2330000, 2331000, 2332000, 2333000, 2334000, 2335000, 2336000, 2337000, 2338000, 2345000, 2359000, 2360000, 2361000, 2362000, 2379000, 2380000, 2381000, 2382000, 2383000, 2384000, 2385000, 2393000, 2394000, 2395000, 2396000, 2397000, 2421000, 2460000, 2461000, 2462000, 2482000, 2487000, 2488000, 2489000, 2490000, 2499000, 2507000, 2518000, 2521000, 2524000, 2527000, 2533000, 2534000, 2535000, 2536000, 2537000, 2538000, 2540000, 2542000, 2556000, 2557000, 2558000, 2559000, 2560000, 2561000, 2562000, 2563000, 2564000, 2565000, 2566000, 2567000, 2579000, 2580000, 2581000, 2585000, 2586000, 2587000, 2588000, 2589000, 2590000, 2591000, 2592000, 2593000, 2594000, 2602000, 2603000, 2604000, 2605000, 2606000, 2614000, 2615000, 2616000, 2617000, 2618000, 2619000, 2620000, 2621000, 2622000, 2623000, 2624000, 2626000, 2627000, 2628000, 2629000, 2630000, 2645000, 2646000, 2647000, 2648000, 2650000, 2665000, 2666000, 2673000, 2674000, 2675000, 2676000, 2677000, 2678000, 2679000, 2680000, 2685000, 2687000, 2688000, 2689000, 2690000, 2692000, 2693000, 2694000, 2698000, 2699000, 2700000, 2701000, 2702000, 2703000, 2704000, 2705000, 2714000, 2715000, 2721000, 2722000, 2723000, 2728000, 2755000, 12700000, 12709000, 12710000, 12711000, 13711000, 17000000, 17001000, 17002000, 17003000, 17004000, 17005000, 17006000, 17007000, 17008000, 50001000, 50002000, 50003000, 50009000, 50023000, 50025000, 50080000, 50081000, 50082000, 50086000, 50087000, 50088000, 50093000, 50105000, 50128000, 50130000, 50131000, 50132000, 50133000, 50134000, 50168000, 50169000, 50170000, 50171000, 50177000, 50195000, 50251000, 50252000, 50253000, 50254000, 50255000, 50256000, 50257000, 50258000, 50259000, 50295000, 50296000, 50297000, 50298000, 50299000, 50300000, 50301000, 50302000, 50305000, 50346000, 50347000, 50348000, 50368000, 50381000, 50382000, 50383000, 50384000, 50385000, 50386000, 50387000, 50388000, 50391000, 50409000, 50423000, 50424000, 50425000, 50426000, 50427000, 50428000, 50442000, 50446000, 50456000, 50477000, 50478000, 50479000, 50488000, 50501000, 50509000, 50540000, 50545000, 50547000, 50556000, 50557000, 50558000, 50559000, 50560000, 50570000, 50579000, 50588000, 50603000, 50604000, 50605000, 50606000, 50607000, 50608000, 50622000, 50623000, 50624000, 50625000, 50675000, 50676000, 50677000, 50678000, 50679000, 50680000, 50681000, 50682000, 50683000, 50684000, 50685000, 50686000, 50687000, 50688000, 50689000, 50690000, 50691000, 50696000, 50697000, 50698000, 50699000, 50700000, 55000, 1977000, 1978000, 1979000, 2311000, 2312000, 2313000, 2314000, 2315000, 2316000, 2317000, 2318000, 2319000, 2320000, 2321000, 2322000, 2323000, 2324000, 2325000, 2326000, 2470000, 2472000, 2473000, 2475000, 2476000, 2478000, 2479000, 2481000, 2484000, 2485000, 2486000, 2491000, 2493000, 2495000, 2497000, 2695000, 21340000, 21341000, 21342000, 21343000, 1883000, 1892000, 1898000, 1946000, 1974000, 1991000, 2116000, 2117000, 2235000, 2253000, 2254000, 2255000, 2256000, 2257000, 2295000, 2296000, 2357000, 2358000, 2525000, 2671000, 2672000, 2734000, 12705000, 12706000, 13705000, 13706000, 16100000, 17028000, 50113000, 185204000, 185205000, 1918000, 1919000, 1926000, 1927000, 1934000, 1937000, 1952000, 1968000, 1987000, 2135000, 2229000, 2262000, 2263000, 2264000, 2284000, 2292000, 2354000, 2519000, 2668000, 12702000, 13702000, 50304000, 185201000, 1872000, 1873000, 1900000, 1909000, 1910000, 1949000, 1990000, 2106000, 2107000, 2108000, 2109000, 2110000, 2111000, 2112000, 2113000, 2114000, 2115000, 2119000, 2120000, 2121000, 2122000, 2123000, 2124000, 2125000, 2127000, 2258000, 2259000, 2260000, 2261000, 2269000, 2285000, 2286000, 2287000, 2288000, 2289000, 2516000, 2522000, 2529000, 2530000, 2741000, 50480000, 1863000, 1864000, 1871000, 1879000, 1981000, 1982000, 1984000, 1988000, 2528000, 2531000, 2738000, 253800000, 255000, 1890000, 1928000, 1943000, 1969000, 1970000, 1971000, 1985000, 1997000, 2128000, 2129000, 2130000, 2294000, 2356000, 2670000, 12704000, 13704000, 21345000, 50390000, 50627000, 185203000, 1940000, 1998000, 2100000, 2101000, 2102000, 2103000, 2104000, 2105000, 2118000, 2126000, 2164000, 2206000, 2207000, 2208000, 2209000, 2210000, 2211000, 2212000, 2213000, 2214000, 2215000, 2216000, 2217000, 2218000, 2219000, 2220000, 2221000, 2222000, 2225000, 2290000, 2466000, 2732000, 50205000, 50303000, 1901000, 1908000, 1916000, 1938000, 50135000, 50136000, 1882000, 1891000, 1939000, 2268000, 2291000, 2293000, 2353000, 2355000, 2391000, 2667000, 2669000, 2706000, 2707000, 12701000, 12703000, 13701000, 13703000, 185200000, 185202000, ]
    }, {

        name: TWIRlang.customlang19,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/bitvy.png',
        items: [1872000, 1873000, 1900000, 1909000, 1910000, 1946000, 1949000, 1990000, 1991000, 2106000, 2107000, 2108000, 2109000, 2110000, 2111000, 2112000, 2113000, 2114000, 2115000, 2119000, 2120000, 2121000, 2122000, 2123000, 2124000, 2125000, 2127000, 2258000, 2259000, 2260000, 2261000, 2269000, 2285000, 2286000, 2287000, 2288000, 2289000, 2516000, 2522000, 2525000, 2529000, 2530000, 2741000, 50480000, 50481000, 50482000, 50483000, 50484000, 50485000, 50486000, 50487000, ]
    }, {

        name: TWIRlang.customlang20,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/speed.png',
        items: [1918000, 1919000, 1926000, 1927000, 1934000, 1937000, 1952000, 1968000, 1987000, 2135000, 2229000, 2262000, 2263000, 2264000, 2284000, 2292000, 2354000, 2470000, 2473000, 2476000, 2479000, 2491000, 2493000, 2495000, 2497000, 2519000, 2668000, 2734000, 12702000, 13702000, 50304000, 185201000, ]
    }, {

        name: TWIRlang.customlang13,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/dobro.png',
        items: [50480000, 50481000, 50482000, 50483000, 50484000, 50485000, 50486000, 50487000, 1909000, 1910000, 1991000, 2110000, 2111000, 2112000, 2113000, 2114000, 2115000, 2121000, 2122000, 2741000, 50480000, 50481000, ]
    }, {

        name: TWIRlang.customlang15,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/duely.png',
        items: [1863000, 1864000, 1871000, 1872000, 1901000, 1908000, 1916000, 1938000, 1946000, 1981000, 1984000, 2285000, 2286000, 2287000, 2288000, 2289000, 2529000, 2695000, 50135000, 50136000, ]
    }, {

        name: TWIRlang.customlang16,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/energia.png',
        items: [255000, 1890000, 1892000, 1898000, 1928000, 1937000, 1943000, 1969000, 1970000, 1971000, 1985000, 1997000, 2128000, 2129000, 2130000, 2235000, 2294000, 2296000, 2312000, 2316000, 2320000, 2324000, 2356000, 2358000, 2485000, 2486000, 2491000, 2493000, 2495000, 2497000, 2525000, 2670000, 2672000, 12704000, 12706000, 13704000, 13706000, 16100000, 17028000, 21341000, 21345000, 50113000, 50390000, 50627000, 185203000, 185205000, ]
    }, {

        name: TWIRlang.customlang23,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/eventy.png',
        items: [55000, 371000, 973000, 974000, 975000, 976000, 2557000, 2558000, 2561000, 2562000, 2563000, 2564000, 2565000, 2566000, 2567000, 2590000, 2591000, 2592000, 2593000, 2594000, 2619000, 2620000, 2621000, 2622000, 2623000, 2665000, 2666000, 2675000, 2676000, 2677000, 2678000, 2679000, 2680000, 2692000, 2693000, 2698000, 12700000, 50691000, ]
    }, {

        name: TWIRlang.customlang17,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/motivace.png',
        items: [255000, 1882000, 1891000, 1928000, 1934000, 1939000, 1952000, 1981000, 1984000, 1985000, 1988000, 1997000, 2128000, 2129000, 2130000, 2268000, 2291000, 2293000, 2353000, 2355000, 2391000, 2484000, 2516000, 2667000, 2669000, 2706000, 2707000, 2734000, 12701000, 12703000, 13701000, 13703000, 17028000, 50113000, 50135000, 50136000, 50627000, 185200000, 185202000, ]
    }, {

        name: TWIRlang.customlang24,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/poklady.png',
        items: [371000, 374000, 376000, 377000, 378000, 379000, 852000, 853000, 926000, 927000, 928000, 973000, 974000, 975000, 976000, 1003000, 1838000, 1868000, 1869000, 1878000, 1887000, 1888000, 1897000, 1905000, 1906000, 1915000, 1923000, 1924000, 1933000, 1960000, 1961000, 1964000, 1967000, 1975000, 1976000, 2131000, 2132000, 2133000, 2134000, 2136000, 2137000, 2138000, 2139000, 2144000, 2152000, 2172000, 2173000, 2174000, 2175000, 2176000, 2187000, 2192000, 2193000, 2194000, 2195000, 2196000, 2197000, 2198000, 2199000, 2200000, 2201000, 2202000, 2203000, 2204000, 2205000, 2226000, 2227000, 2297000, 2298000, 2299000, 2300000, 2305000, 2329000, 2330000, 2331000, 2332000, 2333000, 2334000, 2335000, 2336000, 2337000, 2338000, 2345000, 2359000, 2360000, 2361000, 2362000, 2379000, 2380000, 2381000, 2382000, 2383000, 2384000, 2385000, 2393000, 2394000, 2395000, 2396000, 2397000, 2421000, 2460000, 2461000, 2462000, 2482000, 2487000, 2488000, 2489000, 2490000, 2499000, 2507000, 2518000, 2521000, 2524000, 2527000, 2533000, 2534000, 2535000, 2536000, 2537000, 2538000, 2540000, 2542000, 2556000, 2557000, 2558000, 2559000, 2560000, 2561000, 2562000, 2563000, 2564000, 2565000, 2566000, 2567000, 2579000, 2580000, 2581000, 2585000, 2586000, 2587000, 2588000, 2589000, 2590000, 2591000, 2592000, 2593000, 2594000, 2602000, 2603000, 2604000, 2605000, 2606000, 2614000, 2615000, 2616000, 2617000, 2618000, 2619000, 2620000, 2621000, 2622000, 2623000, 2624000, 2626000, 2627000, 2628000, 2629000, 2630000, 2645000, 2646000, 2647000, 2648000, 2650000, 2665000, 2666000, 2673000, 2674000, 2675000, 2676000, 2677000, 2678000, 2679000, 2680000, 2685000, 2687000, 2688000, 2689000, 2690000, 2692000, 2693000, 2694000, 2698000, 2699000, 2700000, 2701000, 2702000, 2703000, 2704000, 2705000, 2714000, 2715000, 2721000, 2722000, 2723000, 2728000, 2755000, 12700000, 12709000, 12710000, 12711000, 13711000, 17000000, 17001000, 17002000, 17003000, 17004000, 17005000, 17006000, 17007000, 17008000, 50001000, 50002000, 50003000, 50009000, 50023000, 50025000, 50080000, 50081000, 50082000, 50086000, 50087000, 50088000, 50093000, 50105000, 50128000, 50130000, 50131000, 50132000, 50133000, 50134000, 50168000, 50169000, 50170000, 50171000, 50177000, 50195000, 50251000, 50252000, 50253000, 50254000, 50255000, 50256000, 50257000, 50258000, 50259000, 50295000, 50296000, 50297000, 50298000, 50299000, 50300000, 50301000, 50302000, 50305000, 50346000, 50347000, 50348000, 50368000, 50381000, 50382000, 50383000, 50384000, 50385000, 50386000, 50387000, 50388000, 50391000, 50409000, 50423000, 50424000, 50425000, 50426000, 50427000, 50428000, 50442000, 50446000, 50456000, 50477000, 50478000, 50479000, 50488000, 50501000, 50509000, 50540000, 50545000, 50547000, 50556000, 50557000, 50558000, 50559000, 50560000, 50570000, 50579000, 50588000, 50603000, 50604000, 50605000, 50606000, 50607000, 50608000, 50622000, 50623000, 50624000, 50625000, 50675000, 50676000, 50677000, 50678000, 50679000, 50680000, 50681000, 50682000, 50683000, 50684000, 50685000, 50686000, 50687000, 50688000, 50689000, 50690000, 50691000, 50696000, 50697000, 50698000, 50699000, 50700000, ]
    }, {

        name: TWIRlang.customlang14,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/pb.png',
        items: [1879000, 1940000, 1982000, 1988000, 1998000, 2100000, 2101000, 2102000, 2103000, 2104000, 2105000, 2118000, 2126000, 2164000, 2206000, 2207000, 2208000, 2209000, 2210000, 2211000, 2212000, 2213000, 2214000, 2215000, 2216000, 2217000, 2218000, 2219000, 2220000, 2221000, 2222000, 2225000, 2285000, 2286000, 2287000, 2288000, 2289000, 2290000, 2313000, 2317000, 2321000, 2325000, 2466000, 2491000, 2493000, 2495000, 2497000, 2516000, 2525000, 2528000, 2531000, 2732000, 2738000, 21342000, 50205000, 50303000, 253800000, ]
    }, {

        name: TWIRlang.customlang18,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/schopnosti.png',
        items: [1863000, 1864000, 1871000, 1872000, 1873000, 1879000, 1946000, 1977000, 1978000, 1979000, 1981000, 1982000, 1984000, 1988000, 2285000, 2286000, 2287000, 2288000, 2289000, 2516000, 2525000, 2528000, 2529000, 2530000, 2531000, 2738000, 50482000, 50483000, 50484000, 50485000, 50486000, 50487000, 253800000, ]
    }, {

        name: TWIRlang.customlang36,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/ulohy.png',
        items: [251000, 770000, 772000, 773000, 774000, 775000, 776000, 796000, 799000, 995000, 996000, 1016000, 1019000, 1700000, 1701000, 1702000, 1703000, 1704000, 1706000, 1707000, 1709000, 1710000, 1711000, 1712000, 1750000, 1751000, 1752000, 1753000, 1754000, 1757000, 1758000, 1760000, 1761000, 1763000, 1764000, 1765000, 1766000, 1767000, 1768000, 1769000, 1770000, 1771000, 1773000, 1774000, 1775000, 1776000, 1777000, 1778000, 1779000, 1780000, 1781000, 1782000, 1783000, 1784000, 1785000, 1786000, 1789000, 1790000, 1792000, 1793000, 1794000, 1795000, 1796000, 1797000, 1798000, 1799000, 1800000, 1801000, 1802000, 1803000, 1804000, 1805000, 1806000, 1838000, 1839000, 1840000, 1841000, 1842000, 1843000, 1844000, 1845000, 1846000, 1847000, 1848000, 1849000, 1850000, 1851000, 1852000, 1853000, 1854000, 1935000, 1936000, 1953000, 1954000, 1956000, 1957000, 1958000, 1959000, 1962000, 1963000, 1964000, 1965000, 1966000, 1973000, 1992000, 1993000, 1994000, 1995000, 1996000, 2001000, 2004000, 2007000, 2010000, 2145000, 2146000, 2147000, 2148000, 2153000, 2224000, 2245000, 2265000, 2266000, 2267000, 2306000, 2307000, 2308000, 2309000, 2328000, 2340000, 2346000, 2347000, 2348000, 2349000, 2350000, 2351000, 2364000, 2365000, 2366000, 2367000, 2368000, 2369000, 2370000, 2371000, 2372000, 2373000, 2374000, 2375000, 2376000, 2377000, 2378000, 2386000, 2387000, 2388000, 2389000, 2390000, 2392000, 2398000, 2399000, 2400000, 2401000, 2402000, 2403000, 2404000, 2405000, 2406000, 2407000, 2408000, 2410000, 2411000, 2412000, 2413000, 2414000, 2415000, 2416000, 2417000, 2418000, 2419000, 2420000, 2421000, 2422000, 2424000, 2425000, 2426000, 2427000, 2428000, 2429000, 2500000, 2501000, 2502000, 2503000, 2504000, 2505000, 2506000, 2508000, 2509000, 2510000, 2511000, 2512000, 2513000, 2514000, 2515000, 2532000, 2552000, 2553000, 2554000, 2568000, 2569000, 2570000, 2571000, 2572000, 2573000, 2574000, 2575000, 2681000, 2682000, 2683000, 2702000, 2703000, 2704000, 2705000, 2708000, 2709000, 2710000, 2711000, 2712000, 2713000, 2729000, 12707000, 12708000, 17020000, 17021000, 17022000, 17023000, 17024000, 17025000, 17026000, 17027000, 50091000, 50094000, 50172000, 50173000, 50174000, 50175000, 50176000, 50178000, 50179000, 50180000, 50181000, 50182000, 50183000, 50184000, 50185000, 50186000, 50196000, 50197000, 50198000, 50199000, 50200000, 50201000, 50202000, 50203000, 50204000, 50207000, 50208000, 50209000, 50271000, 50272000, 50273000, 50274000, 50275000, 50276000, 50277000, 50278000, 50317000, 50318000, 50319000, 50320000, 50321000, 50322000, 50349000, 50350000, 50351000, 50352000, 50369000, 50389000, 50429000, 50430000, 50431000, 50489000, 50490000, 50491000, 50492000, 50493000, 50494000, 50495000, 50496000, 50497000, 50498000, 50499000, 50500000, 50546000, 50548000, 50566000, 50609000, 50610000, 50611000, 50612000, 50613000, ]
    }, {

        name: TWIRlang.customlang37,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/vybava.png',
        items: [252000, 674000, 723000, 768000, 792000, 794000, 797000, 945000, 979000, 991000, 997000, 998000, 999000, 1702000, 1715000, 1717000, 1740000, 1759000, 1762000, 1772000, 1955000, 1972000, 2154000, 2188000, 2189000, 2190000, 2191000, 2223000, 2228000, 2301000, 2302000, 2339000, 2352000, 2363000, 2409000, 2483000, 2539000, 2541000, 2551000, 2555000, 2577000, 2578000, 2583000, 2600000, 2610000, 2611000, 2612000, 2613000, 2640000, 2641000, 2642000, 2643000, 2644000, 2649000, 2660000, 2661000, 2662000, 2663000, 2684000, 2691000, 2696000, 2697000, 2716000, 2717000, 2718000, 2719000, 2720000, 2724000, 2725000, 2726000, 2727000, 12713000, 50000000, 50016000, 50076000, 50089000, 50090000, 50092000, 50107000, 50109000, 50111000, 50112000, 50137000, 50145000, 50153000, 50161000, 50194000, 50206000, 50243000, 50279000, 50292000, 50313000, 50323000, 50331000, 50342000, 50353000, 50377000, 50402000, 50422000, 50432000, 50464000, 50502000, 50510000, 50511000, 50512000, 50513000, 50514000, 50515000, 50516000, 50517000, 50518000, 50519000, 50520000, 50521000, 50522000, 50523000, 50524000, 50525000, 50526000, 50527000, 50528000, 50529000, 50530000, 50531000, 50532000, 50533000, 50534000, 50535000, 50536000, 50537000, 50538000, 50539000, 50544000, 50549000, 50555000, 50569000, 50578000, 50587000, 50596000, 50621000, 50626000, 50635000, 50661000, 50671000, ]
    }, {

        name: TWIRlang.customlang22,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/premium.png',
        items: [2196000, 2197000, 2198000, 2199000, 2200000, 2467000, 2576000, 2732000, 50113000, 2201000, 2202000, 2203000, 2204000, 2205000, 2247000, 2248000, 2249000, 2250000, 2251000, 2270000, 2290000, 2314000, 2318000, 2322000, 2326000, 2421000, 2465000, 2468000, 2472000, 2475000, 2478000, 2481000, 2491000, 2493000, 2495000, 2497000, 2559000, 2560000, 2738000, 21343000, 1977000, 1978000, 1979000, 2311000, 2312000, 2313000, 2314000, 2315000, 2316000, 2317000, 2318000, 2319000, 2320000, 2321000, 2322000, 2323000, 2324000, 2325000, 2326000, 2470000, 2472000, 2473000, 2475000, 2476000, 2478000, 2479000, 2481000, 2482000, 2484000, 2485000, 2486000, 2491000, 2493000, 2495000, 2497000, 2695000, 21340000, 21341000, 21342000, 21343000, ]
    }, {

        name: TWIRlang.customlang21,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/hp.png',
        items: [1883000, 1892000, 1898000, 1946000, 1974000, 1991000, 2116000, 2117000, 2235000, 2253000, 2254000, 2255000, 2256000, 2257000, 2295000, 2296000, 2357000, 2358000, 2486000, 2525000, 2671000, 2672000, 2734000, 12705000, 12706000, 13705000, 13706000, 16100000, 17028000, 50113000, 185204000, 185205000, ]
    }, ];
    var TW_Recepts = [{

        name: TWIRlang.customlang38,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/blind.png',
        items: [1950000, 1857000, 1917000, 1860000, 1951000, 1920000, 1921000, 1922000, 1925000, 1929000, 1930000, 1931000, 1932000, 1986000, 2005000, 1947000, 1899000, 1858000, 1948000, 1902000, 1903000, 1904000, 1907000, 1911000, 1912000, 1913000, 1914000, 2733000, 1989000, 2008000, 1944000, 1861000, 1881000, 1880000, 1945000, 1884000, 1885000, 1886000, 1889000, 1893000, 1894000, 1895000, 1896000, 2730000, 1983000, 2002000, 1941000, 1855000, 1862000, 1856000, 1942000, 1865000, 1866000, 1867000, 1870000, 1874000, 1875000, 1877000, 2736000, 1980000, 2737000, 1999000, ]
    }, {

        name: TWIRlang.customlang26,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/kuchar.png',
        items: [1941000, 1855000, 1862000, 1856000, 1942000, 1865000, 1866000, 1867000, 1870000, 1874000, 1875000, 1877000, 2736000, 1980000, 2737000, 1999000, ]
    }, {

        name: TWIRlang.customlang27,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/mastickar.png',
        items: [1944000, 1861000, 1881000, 1880000, 1945000, 1884000, 1885000, 1886000, 1889000, 1893000, 1894000, 1895000, 1896000, 2730000, 1983000, 2002000, ]
    }, {

        name: TWIRlang.customlang28,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/kovac.png',
        items: [1947000, 1899000, 1858000, 1948000, 1902000, 1903000, 1904000, 1907000, 1911000, 1912000, 1913000, 1914000, 2733000, 1989000, 2008000, ]
    }, {

        name: TWIRlang.customlang29,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/sedlar.png',
        items: [1950000, 1857000, 1917000, 1860000, 1951000, 1920000, 1921000, 1922000, 1925000, 1929000, 1930000, 1931000, 1932000, 1986000, 2005000, ]
    }, {

        name: TWIRlang.customlang25,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/vyrobky.png',
        items: [1940000, 1943000, 1863000, 1864000, 1871000, 1872000, 1873000, 2516000, 1879000, 1981000, 1982000, 2738000, 1939000, 1946000, 1882000, 1883000, 1890000, 1891000, 1892000, 2525000, 1898000, 1984000, 1985000, 2732000, 1938000, 1949000, 1900000, 1901000, 1908000, 1909000, 1910000, 2522000, 1916000, 1990000, 1991000, 2734000, 1937000, 1952000, 1918000, 1919000, 1926000, 1927000, 1928000, 2519000, 1934000, 1987000, 1988000, 2741000, ]
    }, {

        name: TWIRlang.customlang39,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/karty.png',
        items: [1868000, 1869000, 1878000, 2518000, 1887000, 1888000, 1897000, 2527000, 1905000, 1906000, 1915000, 2524000, 1923000, 1924000, 1933000, 2521000, ]
    }, {

        name: TWIRlang.customlang35,
        img: 'https://jamzask.github.io/TWInventoryReloaded/ikony/recepty.png',
        items: [20060000, 20061000, 20062000, 20080000, 20093000, 20094000, 20095000, 20063000, 20064000, 20065000, 20066000, 20067000, 20068000, 20069000, 20070000, 20071000, 20072000, 20073000, 20074000, 20075000, 20076000, 20077000, 20117000, 20078000, 20079000, 20121000, 20137000, 20106000, 20125000, 20107000, 20108000, 20138000, 20109000, 20110000, 20139000, 20040000, 20041000, 20042000, 20082000, 20090000, 20091000, 20092000, 20043000, 20044000, 20045000, 20046000, 20047000, 20048000, 20049000, 20050000, 20051000, 20052000, 20053000, 20054000, 20055000, 20056000, 20057000, 20118000, 20058000, 20059000, 20122000, 20131000, 20111000, 20126000, 20112000, 20113000, 20132000, 20114000, 20115000, 20133000, 20020000, 20021000, 20022000, 20081000, 20087000, 20088000, 20089000, 20023000, 20024000, 20025000, 20026000, 20027000, 20028000, 20029000, 20030000, 20031000, 20032000, 20033000, 20034000, 20035000, 20036000, 20037000, 20119000, 20038000, 20039000, 20123000, 20128000, 20101000, 20127000, 20102000, 20103000, 20129000, 20104000, 20105000, 20130000, 20000000, 20001000, 20002000, 20083000, 20084000, 20085000, 20086000, 20003000, 20004000, 20005000, 20006000, 20007000, 20008000, 20009000, 20010000, 20011000, 20012000, 20013000, 20014000, 20015000, 20016000, 20017000, 20116000, 20018000, 20019000, 20134000, 20096000, 20120000, 20124000, 20097000, 20098000, 20135000, 20099000, 20100000, 20136000, ]
    }, ];

    TWIR.gui = {};
    var ICONE = {
        init: function() {
            try {
                EventHandler.signal("ICONE.init");
                var that = this;
                var timeout = 0;
                this.interval = setInterval(function() {
                    var loading = false;
                    if (isDefined(Character.playerId) && Character.playerId === 0) {
                        loading = false;
                    } else if (!isDefined(ItemManager)) {
                        loading = false;
                    } else if (isDefined(ItemManager.initialized) && !ItemManager.initialized) {
                        loading = false;
                    } else if (isDefined(window.TWDB)) {
                        if (!window.TWDB.ClothCalc.ready) {
                            loading = true;
                            timeout++;
                            if (timeout > 20) {
                                ErrorLog.log('Chyba, nelze načíst TWDB ?');
                                ICONE.isTWDBHere = true;
                                loading = true;
                            }
                        } else {
                            ICONE.isTWDBHere = true;
                            loading = true;
                        }
                    } else {
                        loading = true;
                    }
                    if (loading) {
                        clearInterval(that.interval);
                        if (ICONE.scriptStorage === null) {
                            ICONE.scriptStorage = new Storage("local", "Storage.");
                        }
                        ICONE.ready = true;
                        EventHandler.signal('ICONE.ready');
                        ICONE.Inventar.create();
                        ICONE.Panel.create();
                    }
                }, 500);
            } catch (e) {
                ErrorLog.log("Chyba inicializace ?", e);
                ErrorLog.showLog();
                ICONE.ready = false;
            }
        },
        Commons: {
            searchMarket: function(id) {
                if (!isNaN(id)) {
                    var objS = ItemManager.get(id);
                    id = objS.name;
                }
                MarketWindow.open(Character.homeTown.town_id);
                MarketWindow.showTab('buy');
                $("div.market-buy .iSearchbox input", MarketWindow.DOM).val(id);
                $('span.iconBut_mpb_refresh', MarketWindow.DOM).click();
            },
            addMarketBuyLink: function(itemId) {
                var imgMrket = $('<img class="TWIRcraftitem opmarket" id="' +
                    itemId +
                    '" style="background: url(\'/images/window/market/market_icons2.png\') repeat-x scroll 0 0 transparent;cursor: pointer;display: inline-block;position:absolute;top:4px;left:3px;width:15px;height:15px;padding:0px;border:0px;margin:0px;background-position: -17px 0;" ' +


                    'Title="' +
                    TWIRlang.Differ.TitleMarket +
                    '" />').click(function(e) {
                    ICONE.Commons.searchMarket(e.target.attributes['id'].value);
                });
                return imgMrket;
            },
        },
        MetaCol: {
            group: [],
            groupSorted: [],
            marketEC: {},
            all: {},
            inProgress: {},
            erreur: false,
            ready: false,
            dirty: true,
            getMarketEC: function() {
                $.ajax({
                    url: 'game.php?window=building_market&action=fetch_bids&h=' +
                        Player.h,
                    type: 'POST',
                    data: {},
                    dataType: 'json',
                    async: false,
                    success: function(json) {
                        if (json.error)
                            return new UserMessage(json.msg, UserMessage.TYPE_ERROR).show();
                        var result = json.msg.search_result;
                        ICONE.MetaCol.marketEC = [];
                        for (var i = 0; i < result.length; i++) {
                            var item = ItemManager.get(result[i].item_id);
                            if (isDefined(item)) {
                                ICONE.MetaCol.marketEC[$.trim(item.name)] = result[i];
                            }
                        }
                    }
                });
            },
            populateInProgress: function(all) {
                try {
                    var tmpArr = all["achievements"]["progress"];
                    $.merge(tmpArr, all["achievements"]["finished"]);
                    $.each(tmpArr, function(index, value) {
                        var itemsImg = [];
                        var rex = /<span.*?([\s\S]*?)<\/span>/gm;
                        var match;
                        while (match = rex.exec(value.meta)) {
                            var val = match[1];
                            var srcI = /<img.*?src="(.*?)"/.exec(val)[1];
                            var ident = $.trim(value.title);
                            var strManquant = "";
                            var name = /<img.*?alt="(.*?)"/.exec(val)[1];
                            var shoudBuy = (val.indexOf("locked") > -1);
                            ICONE.MetaCol.inProgress[name] = {
                                shouldBuy: (val.indexOf("locked") > -1),
                                src: srcI,
                                img: srcI.match(/\S*.\/(\S*png)/)[1],
                                group: ident
                            };
                            if (shoudBuy) {
                                if (!isDefined(ICONE.MetaCol.group[ident])) {
                                    ICONE.MetaCol.group[ident] = [];
                                }
                                ICONE.MetaCol.group[ident].push(name);
                            }
                        }
                    });
                    var sortable = [];
                    for (var group in ICONE.MetaCol.group) {
                        sortable.push([group, ICONE.MetaCol.group[group]]);
                    }
                    sortable.sort(function(a, b) {
                        var x = a[0];
                        var y = b[0];
                        if (typeof x === 'string' && typeof x === 'string') {
                            return x.localeCompare(y);
                        }
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    });
                    ICONE.MetaCol.groupSorted = sortable;
                    ICONE.MetaCol.dirty = false;
                } catch (e) {
                    this.erreur = "Initialisation des Collections impossible";
                    ErrorLog.log(e, this.erreur);
                    ErrorLog.showLog();
                }
            },
            sort: function(array, key) {
                return array.sort(function(a, b) {
                    var x = a[key];
                    var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            },
            init: function() {
                if (this.ready == false) {
                    ICONE.MetaCol.setCol = [];
                    ICONE.MetaCol.setsProgress = [];
                    ICONE.MetaCol.groupSet = [];
                    ICONE.MetaCol.all = {};
                    ICONE.MetaCol.group = {};
                    ICONE.MetaCol.inProgress = {};
                    var that = this;
                    $.ajax({
                        url: 'game.php?window=achievement&action=get_list&h=' +
                            Player.h,
                        type: 'POST',
                        data: {
                            'folder': 'collections',
                            'playerid': Character.playerId
                        },
                        dataType: 'json',
                        async: false,
                        success: function(data_return) {
                            var all = eval(data_return);
                            if (all["achievements"]["progress"].length > 0) {
                                ICONE.MetaCol.all = all;
                                ICONE.MetaCol.getMarketEC();
                                ICONE.MetaCol.populateInProgress(eval(data_return));
                                ICONE.MetaCol.ready = true;
                            } else {
                                EventHandler.signal('collections_finished');
                                ICONE.MetaCol.finished = true;
                                ICONE.scriptStorage.setItem('ICONE.Cache.Metacol.finished', true);
                            }
                        }
                    });
                    var sets = west.storage.ItemSetManager.getAll();
                    sets = ICONE.MetaCol.sort(sets, "name");
                    for (var jj = 0; jj < sets.length; jj++) {
                        var set = sets[jj];
                        var items = set.getItems();
                        var detSet = [];
                        var isFriend = false;
                        for (var zz = 0; zz < items.length; zz++) {
                            var item = ItemManager.getByBaseId(items[zz]);
                            if (!isDefined(item)) {
                                ErrorLog.log("Erreur sur " +
                                    items[zz] + " " +
                                    set.name);
                            } else {
                                if (item.short.indexOf("friendset_") == -1) {
                                    var weared = Wear.carries(item.item_base_id);
                                    var bagItem = Bag.getItemByItemId(item.item_id);
                                    if (!weared && !(isDefined(bagItem))) {
                                        detSet.push(item.name);
                                        ICONE.MetaCol.setsProgress[item.name] = item.image;
                                    }
                                } else {
                                    isFriend = true;
                                    break;
                                }
                            }
                        };
                        if (detSet.length > 0 && !isFriend) {
                            ICONE.MetaCol.setCol.push([set.name, detSet]);
                            ICONE.MetaCol.groupSet[set.name] = detSet;
                        }
                    };
                }
            },
            isFinished: function(name) {
                if (ICONE.MetaCol.finished)
                    return true;
                var item = ICONE.MetaCol.inProgress[$.trim(name)];
                if (!isDefined(item)) {
                    return true;
                } else if (isDefined(ICONE.MetaCol.group[item.group]) && ICONE.MetaCol.group[item.group][0] == true) {
                    return true;
                } else if (!isDefined(ICONE.MetaCol.group[item.group])) {
                    return true;
                } else
                    return false;
            },
            shouldBuy: function(name) {
                var item = ICONE.MetaCol.inProgress[$.trim(name)];
                var marketed = ICONE.MetaCol.marketEC[$.trim(name)];
                if (isDefined(item) && !isDefined(marketed)) {
                    return item.shouldBuy;
                } else {
                    return false;
                }
            },
            getBuyItems: function(name, withbr) {
                try {
                    var br = (withbr) ? "<BR>" : " - ";
                    var item = ICONE.MetaCol.inProgress[$.trim(name)];
                    if (isDefined(item)) {
                        var manquants = ICONE.MetaCol.group[item.group];
                        if (isDefined(manquants) && manquants.length > 0) {
                            var strManq = br;
                            $.each(manquants, function(inD, val) {
                                strManq += "[ " + val +
                                    " ]" + br;
                            });
                            return strManq += " ";
                        } else {
                            return "";
                        }
                    }
                } catch (e) {
                    this.erreur = "Impossible de recenser les items manquants pour " +
                        name;
                    ErrorLog.log(e, this.erreur);
                }
                return "";
            },
            remove: function(arr, name) {
                name = $.trim(name);
                var x, _i, _len, _results;
                _results = [];
                for (_i = 0, _len = arr.length; _i < _len; _i++) {
                    x = arr[_i];
                    if (x != name) {
                        _results.push(x);
                    }
                }
                return _results;
            }
        },
        WindowCollection: {
            scrollbar: null,
            totalGroup: 0,
            cbTrader: null,
            cbBid: null,
            cbCurBid: null,
            getAllAnchors: function(what, group) {
                var that = this;
                if (!isDefined(what)) {
                    what = ICONE.MetaCol.groupSorted;
                    group = ICONE.MetaCol.group;
                }
                var textinput = new west.gui.Textfield().maxlength(12).setPlaceholder(TWIRlang.Differ.select).setWidth(165);
                var anchors = new west.gui.Selectbox();
                anchors.setWidth(200);
                $(anchors.elContent).css({
                    "max-height": "270px",
                    "width": "250px",
                    "overflow-y": 'auto'
                });
                anchors.addItem(TWIRlang.Differ.allOpt, TWIRlang.Differ.allOpt);
                $.each(what, function(ind2, val) {
                    anchors.addItem(val[0], val[0]);
                });
                anchors.addItem("99999", " ");
                anchors.addListener(function(e) {
                    var str = "";
                    textinput.setValue(e);
                    var arrtmp = {};

                    if (e == TWIRlang.Differ.allOpt) {

                        arrtmp = what;
                    } else {
                        arrtmp[0] = [e, group[e]];
                    }
                    that.scrollbar.scrollToTop();
                    var opt = that.getDiv(arrtmp);
                    $('#showbox').html(opt);
                    that.switchOff();
                    return true;
                });
                textinput.click(function(e) {
                    anchors.show(e);
                });
                return textinput.getMainDiv();
            },
            initTrader: function() {
                var check = -1;
                var model = west.window.shop.model.getCategory('trader');
                if (isDefined(model)) {
                    var timeTrader = model.getRefreshTimeout();
                    check = timeTrader -
                        Math.round(new Date() / 1000);
                    var traderInv = west.window.shop.model._data.inventory.trader;
                    west.window.shop.model._data.trader_timeout = timeTrader;
                }
                if (check < 0) {
                    $.ajax({
                        url: 'game.php?window=shop_trader&mode=index',
                        type: 'POST',
                        dataType: 'json',
                        async: false,
                        success: function(data_return) {
                            var all = eval(data_return);
                            traderInv = all["inventory"]["trader"];
                            west.window.shop.model._data.inventory.trader = all["inventory"]["trader"];
                            west.window.shop.model._data.trader_timeout = all["traderTime"];
                        }
                    });
                }
                var traderItems = [];
                $.each(traderInv, function(i, item) {
                    var obj = item.item_data;
                    if (!isDefined(obj)) {
                        obj = ItemManager.get(item.item_id);
                    }
                    traderItems[obj.name.trim()] = item;
                });
                return traderItems;
            },
            getDiv: function(what) {
                var traderItems = this.initTrader();
                var that = this;
                var total = 0;
                var divMain = $("<br /><table width='100%' cellpading=10 cellspacing=10  style='font-style: bold; -webkit-user-select: text !important; -khtml-user-select: text !important; -moz-user-select: text !important; -ms-user-select: text !important; user-select: text !important;' />");
                $.each(what, function(ind2, valGroup) {
                    var imod = 0;
                    var bigTR = $('<tr/>');
                    bigTR.attr('class', 'questlog_entrie');
                    bigTR.css({
                        'color': '#113355'
                    });
                    bigTR.attr('id', $.trim(valGroup[0]));
                    bigTR.append($('<td />').append($.trim(valGroup[0])));
                    divMain.append(bigTR);
                    $.each(valGroup[1], function(ind3, val) {
                        var tr = $('<tr style="font-weight:bold;font-style:italic;"></tr>');
                        var td = $('<td class="achieve_list"/>');
                        var span = $("<span />");
                        var img = $("<img class='resizedImage' />");
                        if (isDefined(ICONE.MetaCol.inProgress[val])) {
                            img.attr('src', ICONE.MetaCol.inProgress[val].src);
                        } else {
                            if (isDefined(ICONE.MetaCol.setsProgress[val])) {
                                img.attr('src', ICONE.MetaCol.setsProgress[val]);
                            }
                        }
                        img.attr("title", TWIRlang.Differ.searchMarket);
                        img.css("cursor", "pointer");
                        img.click(function() {
                            ICONE.Commons.searchMarket(val);
                        });
                        span.append(img).append("&nbsp;").append(val);
                        if (isDefined(traderItems[val.trim()])) {
                            tr.addClass('hasTrader');
                            var divTrader = $('<img src="' +
                                TWIR.images.traderImg +
                                '" style="cursor: pointer;display: inline-block;" ' +
                                'title="' +

                                TWIRlang.Differ.atTrader +

                                '" />');
                            divTrader.click(function() {
                                west.window.shop.open().showCategory("trader");
                            });
                            span.append("&nbsp;&nbsp;&nbsp;").append(divTrader);
                        }
                        var item = ICONE.MetaCol.marketEC[$.trim(val)];
                        if (isDefined(item)) {
                            var imsell = '';
                            var sp = '';
                            if (item.auction_ends_in < 0) {
                                tr.addClass('hasCurrentBid');
                                imsell = $('&nbsp;<span ' +
                                    'title="' +
                                    TWIRlang.Differ.thFetch.replace('%1', item.market_town_name) +
                                    '" ' +
                                    'style="background: url(\'/images/market/fetch.png\') ' +
                                    'repeat-x scroll 0 0 transparent;cursor: pointer;' +
                                    'height: 12px; display: inline-block;width: 12px;"> </span>');
                                item.isFinished = true;
                            } else {
                                tr.addClass('hasBid');
                                sp = $('&nbsp;<span ' +
                                    'title="' +

                                    TWIRlang.Differ.thEncours +

                                    '" ' +
                                    'style="background: url(\'/images/window/market/market_icons2.png\') ' +
                                    'repeat-x scroll 0 0 transparent;cursor: pointer;' +
                                    'height: 16px; background-position: -16px 0;display: inline-block;width: 16px;"> </span>');
                            }
                            span.append('&nbsp;').append(sp).append('&nbsp;').append(imsell).click(function() {
                                MarketWindow.open(Character.homeTown.town_id, 'offer');
                                MarketWindow.showTab('offer');
                            });
                        }
                        td.append(span);
                        td.appendTo(tr);
                        divMain.append(tr);
                        imod++;
                    });
                    total += imod;
                });
                var s = (total > 1) ? 's' : '';
                $('#thliste').text(TWIRlang.Differ.thText.replace('%2', s).replace('%3', s).replace('%1', total));
                return divMain;
            },
            switchOff: function() {
                var that = ICONE.WindowCollection;
                if (that.cbTrader.isSelected() || that.cbBid.isSelected() || that.cbCurBid.isSelected()) {
                    $('tr', $('#rightPane')).css('display', 'none');
                    if (that.cbTrader.isSelected()) {
                        $('.hasTrader', $('#rightPane')).css('display', '');
                    }
                    if (that.cbBid.isSelected()) {
                        $('.hasBid', $('#rightPane')).css('display', '');
                    }
                    if (that.cbCurBid.isSelected()) {
                        $('.hasCurrentBid', $('#rightPane')).css('display', '');
                    }
                } else {
                    $('tr', $('#rightPane')).css('display', '');
                }
            },
            getFiltres: function() {
                this.cbTrader = new west.gui.Checkbox(TWIRlang.Differ.atTrader, '', this.switchOff).setTitle(TWIRlang.Differ.atTraderTitle);
                this.cbBid = new west.gui.Checkbox(TWIRlang.Differ.atBid, '', this.switchOff).setTitle(TWIRlang.Differ.atBidTitle);
                this.cbCurBid = new west.gui.Checkbox(TWIRlang.Differ.atCurBid, '', this.switchOff).setTitle(TWIRlang.Differ.atCurBidTitle);
                var cbox = $('<div class="jobs_basisbox"><h3>' +
                    TWIRlang.Differ.filters +

                    '</h3></div>');
                cbox.append(this.cbTrader.getMainDiv(), '<br />', '<div class="jobs_divider_checkbox" />');
                cbox.append(this.cbBid.getMainDiv(), '<br />', '<div class="jobs_divider_checkbox" />');
                cbox.append(this.cbCurBid.getMainDiv(), '<br />');
                return cbox;
            },
            open: function() {
                if (!ICONE.MetaCol.ready) {
                    ICONE.MetaCol.init();
                    this.interval = setInterval(function() {
                        if (ICONE.MetaCol.ready)
                            clearInterval(this.interval);
                    }, 200);
                }
                this.Window = wman.open('WindowCollection', TWIRlang.Differ.listText).setMiniTitle(TWIRlang.Differ.listText);
                this.Window.addTab(TWIRlang.Differ.colTabTitle, "TabCols", this.openCols);
                if (window == 'sets') {
                    this.openCols();
                } else {
                    this.openCols();
                }
            },
            openb: function() {
                if (!ICONE.MetaCol.ready) {
                    ICONE.MetaCol.init();
                    this.interval = setInterval(function() {
                        if (ICONE.MetaCol.ready)
                            clearInterval(this.interval);
                    }, 200);
                }
                this.Window = wman.open('WindowCollection', TWIRlang.Differ.listText).setMiniTitle(TWIRlang.Differ.listText);
                this.Window.addTab(TWIRlang.Differ.setTabTitle, "TabSets", this.openSets);
                if (window == 'sets') {
                    this.openSets();
                } else {
                    this.openSets();
                }
            },
            openSets: function() {
                ICONE.WindowCollection.Window.activateTab('TabSets').$("div.tw2gui_window_content_pane").empty();
                ICONE.WindowCollection.Window.setTitle(TWIRlang.Differ.listSetText);
                var rightPane = $('<div id="rightPane"/>').css({
                    'height': '100%',
                    'left': '199px',
                    'position': 'absolute',
                    'top': '15px',
                    'width': '450px'
                });
                var leftPane = $('<div id="leftPane" />').css({
                    'position': 'absolute',
                    'top': '15px',
                    'height': '100%',
                    'width': '190px'
                });
                var divide = $('<div class="jobs_divider" />');
                divide.css({
                    'top': '0px',
                    'height': '375px'
                });
                $('<div id="WindowSetsBody" />').append(leftPane).append(divide).append(rightPane).appendTo('.WindowCollection .tw2gui_window_content_pane');
                ICONE.WindowCollection.Window.showLoader();
                ICONE.MetaCol.getMarketEC();
                var showbox = $('<div style="max-height: 370px;"></div>');
                this.scrollbar = new west.gui.Scrollpane;
                this.scrollbar.scrollToTop();
                $(this.scrollbar.getMainDiv()).css({
                    'height': '320px',
                    'top': '5px'
                });
                this.scrollbar.appendContent($('<div id="showbox" align="center"></div>'));
                showbox.append(this.scrollbar.getMainDiv());
                var th = $('<div id="thliste" />');
                th.css({
                    'text-align': 'center',
                    'font-weight': 'bolder'
                });
                $('#rightPane').append(th);
                $('#rightPane').append(showbox);
                $('#leftPane').append(ICONE.WindowCollection.getAllAnchors(ICONE.MetaCol.setCol, ICONE.MetaCol.groupSet));
                var divMain = ICONE.WindowCollection.getDiv(ICONE.MetaCol.setCol);
                $('#showbox').html(divMain);
                ICONE.WindowCollection.Window.hideLoader();
            },
            openCols: function() {
                ICONE.WindowCollection.Window.activateTab('TabCols').$("div.tw2gui_window_content_pane").empty();
                ICONE.WindowCollection.Window.setTitle(TWIRlang.Differ.listText);
                var rightPane = $('<div id="rightPane"/>').css({
                    'height': '100%',
                    'left': '199px',
                    'position': 'absolute',
                    'top': '15px',
                    'width': '450px'
                });
                var leftPane = $('<div id="leftPane" />').css({
                    'position': 'absolute',
                    'top': '15px',
                    'height': '380px',
                    'width': '190px'
                });
                var divide = $('<div class="jobs_divider" />');
                divide.css({
                    'top': '0px',
                    'height': '375px'
                });
                $('<div id="WindowCollectionBody" />').append(leftPane).append(divide).append(rightPane).appendTo('.WindowCollection .tw2gui_window_content_pane');
                ICONE.WindowCollection.Window.showLoader();
                ICONE.MetaCol.getMarketEC();
                var showbox = $('<div style="max-height: 370px;"></div>');
                this.scrollbar = new west.gui.Scrollpane;
                this.scrollbar.scrollToTop();
                $(this.scrollbar.getMainDiv()).css({
                    'height': '320px',
                    'top': '5px'
                });
                this.scrollbar.appendContent($('<div id="showbox" align="center"></div>'));
                showbox.append(this.scrollbar.getMainDiv());
                var th = $('<div id="thliste" />');
                th.css({
                    'text-align': 'center',
                    'font-weight': 'bolder'
                });
                $('#leftPane').append(ICONE.WindowCollection.getAllAnchors());
                $('#leftPane').append(ICONE.WindowCollection.getFiltres());
                $('#rightPane').append(th);
                $('#rightPane').append(showbox);
                var divMain = ICONE.WindowCollection.getDiv(ICONE.MetaCol.groupSorted);
                $('#showbox').html(divMain);
                ICONE.WindowCollection.Window.hideLoader();
            }
        },
        Panel: {
            create: function() {
                ICONE.Panel.attach();
            },
            attach: function() {
                EventHandler.listen("inventory_ready", ICONE.Panel.addCheckBoxBag, "dblbag");
            },
            detach: function() {
                EventHandler.unlisten("inventory_ready", ICONE.Panel.addCheckBoxBag, "dblbag");
                $('#panelFilterCollect', Inventory.DOM).remove();
            },
            addCheckBoxBag: function(div) {
                if ($('#panelFilterCollect', Inventory.DOM).length == 0) {
                    var spanD = $('<div id="panelFilterCollect"  ' + 'style="display: flex; position: inherit;"/>');
                    var insertedCB = $("<span title='" +
                        TWIRlang.Differ.uspechy + "' id='inventory_button1'" + '" style="cursor: pointer; position: relative; margin-right: 4px;" />').append('<img  src="https://jamzask.github.io/TWInventoryReloaded/ikony/uspechy.png" width="20px" height="20px" /></span>');
                    insertedCB.click(function(e) {
                        $('#sumsearch').remove();
                        ICONE.WindowCollection.open();
                    });
                    spanD.append(insertedCB);

                    var insertedCB2 = $('<span title="' +
                        TWIRlang.Differ.sbirky + '" id="inventory_button2"' + '" style="cursor: pointer; position: relative; margin-right: 4px;">' + '<img  src="https://jamzask.github.io/TWInventoryReloaded/ikony/sbirky.png" width="20px" height="20px" /></span>');
                    insertedCB2.click(function(e) {
                        $('#sumsearch').remove();
                        ICONE.WindowCollection.openb();
                    });
                    spanD.append(insertedCB2);


                    var insertedCB3 = $('<span title="' +
                        TWIRlang.Differ.ukoly + '" id="inventory_button3"' + '" style="cursor: pointer; position: relative; margin-right: 4px;">' + '<img  src="https://jamzask.github.io/TWInventoryReloaded/ikony/new.png" width="20px" height="20px" /></span>');
                    insertedCB3.click(function() {
                        $('#sumsearch').remove();


                        featky.updateFeat();
                        DailyItemHelper.showDailyItems();
                    });
                    spanD.append(insertedCB3);



                    var insertedCB4 = $('<span title="' +
                        TWIRlang.Differ.twcalc + '" id="inventory_button4"' + '" style="cursor: pointer; position: relative; margin-right: 4px;">' + '<img  src="https://jamzask.github.io/TWInventoryReloaded/ikony/import.png" width="20px" height="20px" /></span>');
                    insertedCB4.click(function(e) {
                        $('#sumsearch').remove();
                        featky.updateFeat();
						$.getScript("//tw-calc.net/public/import/import.js");
                        void(0)
                    });
                    spanD.append(insertedCB4);
					var insertedCB5 = $('<span title="' +
                        TWIRlang.Differ.wip + '" id="inventory_button5"' + '" style="cursor: pointer; position: relative; margin-right: 4px;">' + '<img  src="https://jamzask.github.io/TWInventoryReloaded/ikony/new.png" width="20px" height="20px" /></span>');
                    insertedCB5.click(function(e) {
                        featky.updateFeat();
                        $('#sumsearch').remove();

                    });
                    spanD.append(insertedCB5);
                    $('.filters', Inventory.DOM).before(spanD);
                }
            }
        },
        Inventar: {
            create: function() {
                ICONE.Inventar.attach();
            },
            attach: function() {
                EventHandler.listen("inventory_ready", ICONE.Inventar.addCheckBoxBag, "duplbag");
            },
            detach: function() {
                EventHandler.unlisten("inventory_ready", ICONE.Inventar.addCheckBoxBag, "duplbag");
                $('#bagFilterWasCollect', Inventory.DOM).remove();
            },
            dupliVyhledavani: function(filtru) {
                var searchTxt = "";
                var searchVal = $('#inventory_search', Inventory.DOM).val();
                if (searchVal.lenght === 0 || Inventory.category != 'set') {
                    searchVal = ".*";
                } else {
                    searchTxt = (searchVal.lenght === 0) ? "" : " (" + searchVal + ")";
                }
                var res = Bag.search(searchVal);
                $('#inventory_search', Inventory.DOM).val("");
               var duplikaty = [];

                var sell = 0;
                $.each(res, function(ind1, item) {
                    $('#sumsearch').remove();
                    if (item.obj.type != 'yield' && ($.inArray(item.getType(), Inventory.getCategoryTypes(Inventory.category)) > -1 || Inventory.category == 'set' || Inventory.category == 'new')) {
                        var count = item.getCount();
                        var weared = Wear.carries(item.obj.item_base_id);
                        if (weared) {
                            count += 1;
                        }
                        if (count > 1) {
                            switch (filtru) {
                                case 'upgradeable':
                                    if (count < 3 || !item.obj.upgradeable) {
                                        item = null;
                                    }
                                    break;
                                case 'nosets':
                                    if (item.obj.set !== null) {
                                        item = null;
                                    }
                                    break;
                                case 'sellable':
                                    if (!item.obj.sellable) {
                                        item = null;
                                    }
                                    break;
                                case 'auctionable':
                                    if (!item.obj.auctionable) {
                                        item = null;
                                    }
                                    break;
                                default:
                                    break;
                            }
                            if (isDefined(item)) {
                                duplikaty.push(item);

                                sell += (item.getSellPrice()) * (count - 1);
                            }
                        }
                    } else {}
                });
                var lastCat = Inventory.category;
                Inventory.showSearchResult(duplikaty || []);

                $('#sumsearch', Inventory.DOM).remove();
                $('#bagFilterWasCollect', Inventory.DOM)
               .after(
												"<div title='"
														+ sell
														+ TWIRlang.Differ.kalkulator
														+ searchTxt
														+ "' id='sumsearch' style='text-align: center; position: absolute; z-index: 4;"
														+ "font-weight: bold; color: black; font-size: 11px; width:"
														+ "100%; top: 382px; '>"
														+ sell
														+ TWIRlang.Differ.kalkulator
														+ "</div>");
               $('#sumsearch').delay(2500).fadeOut();
            },

            searchSpecialni: function(what) {
                $('#inventory_search', Inventory.DOM).val(what);
                var res = Bag.search(what);
                Inventory.showSearchResult(res || []);
                return res;
            },
            getDetSearchBox: function() {
                if (isDefined(west.storage.ItemSetManager)) {
                    var twirSets = new west.gui.Selectbox();
                    twirSets.setWidth(150);
                    $(twirSets.elContent).css({
                        "max-height": "320px",
                        "width": "150px",
                        "overflow-y": 'auto'
                    });
                    ICONE.selAdded = [];
                    twirSets.addItem('all', "<span title='" + TWIRlang.Differ.bug + "'<u>" + TWIRlang.Differ.vsecko_duplikato + '</u></span>');
                    twirSets.addItem('nosets', TWIRlang.Differ.noset);
                    twirSets.addItem('sellable', TWIRlang.Differ.sellable);
                    twirSets.addItem('auctionable', TWIRlang.Differ.auctionable);
                    twirSets.addItem('upgradeable', TWIRlang.Differ.upgradeable);
                    twirSets.addListener(function(e) {
                        switch (e) {
                            case 'all':
                                $('#inventory_search', Inventory.DOM).val("");
                                break;
                            default:
                                break;
                        }
                        ICONE.Inventar.dupliVyhledavani(e);
                        return true;
                    });
                    return twirSets;
                }
                return twirSets;
            },
            getSetNamesBox: function(setsCache) {
                if (isDefined(west.storage.ItemSetManager)) {
                    var twirSets = new west.gui.Selectbox();
                    twirSets.setWidth(200);
                    $(twirSets.elContent).css({
                        "max-height": "320px",
                        "width": "250px",
                        "overflow-y": 'auto'
                    });
                    ICONE.selAdded = [];
                    twirSets.addItem('setitems', '<u>' + TWIRlang.Differ.vsecko_sado + '</u>');
                    $.each(setsCache, function(ind2, item) {
                        var itemsSet = west.storage.ItemSetManager.get(item.obj.set);
                        if (!isDefined(ICONE.selAdded[itemsSet.name])) {
                            ICONE.selAdded[itemsSet.name] = true;
                            twirSets.addItem(itemsSet.name, itemsSet.name);
                        }
                    });
                    twirSets.addListener(function(e) {
                        ICONE.Inventar.searchSpecialni(e);
                        return true;
                    });
                    return twirSets;
                }
                return twirSets;
            },
            addCheckBoxBag: function(div) {
                if ($('#bagFilterWasCollect', Inventory.DOM).length === 0) {
                    var setsCache = Bag.search('setitems');
                    setsCache.sort(function(a, b) {
                        var x = west.storage.ItemSetManager.get(a.obj.set).name;
                        var y = west.storage.ItemSetManager.get(b.obj.set).name;
                        if (typeof x === 'string' && typeof x === 'string') {
                            return x.localeCompare(y);
                        }
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                    });
                    var selBox = ICONE.Inventar.getSetNamesBox(setsCache);
                    var spanD = $('<div id="bagFilterWasCollect"  ' + 'style="display: flex; position: inherit; float: right;"/>');
                    var duplicat = $("<span title='" + TWIRlang.Differ.tip + "' id='inventory_Duplikaty'" + '" class="filter_inventory filter_dopp hasMousePopup"' + '" style="cursor: pointer; position: relative; background: url(https://jamzask.github.io/TWInventoryReloaded/small.png) no-repeat; background-position: -2px 0;" />' + "</span>");
                    duplicat.click(function(e) {
                        $('#sumsearch').remove();
                        ICONE.Inventar.getDetSearchBox().show(e);
                    });
                    spanD.append(duplicat);
                    var pouzitelne = $('<span title="' + TWIRlang.Differ.tipuse + '" id="inventory_pouzitelne"' + '" class="filter_inventory filter_utiliz hasMousePopup"' + '" style="cursor: pointer; position: relative; background: url(https://jamzask.github.io/TWInventoryReloaded/small.png) no-repeat; background-position: -45px 0;">' + "</span>");
                    pouzitelne.click(function(e) {
                        $('#sumsearch').remove();
                        if (!TWIR_QuickSearch.gui.popupMenu) {
                            if (isDefined(west.storage.ItemSetManager)) {
                                TWIR_QuickSearch.gui.popupMenu = new west.gui.Selectbox();
                                TWIR_QuickSearch.gui.popupMenu.setWidth(175);
                                TWIR_QuickSearch.gui.popupMenu.addListener(TWIR_QuickSearch.findSet);
                                for (var i = 0; i < TW_Sets.length; i++)
                                    TWIR_QuickSearch.gui.popupMenu.addItem(i, TW_Sets[i].name + '<img src="' + TW_Sets[i].img + '" height="20" width="40">' + '<div style="padding-right: 20px; text-overflow:ellipsis; white-space:nowrap; overflow:hidden;"></div>');
                            }
                        }
                        TWIR_QuickSearch.gui.popupMenu.show(e);
                    });
                    spanD.append(pouzitelne);
                    var receptare = $('<span title="' +
                        TWIRlang.Differ.tiprecipe + '" id="inventory_recepty"' + '" class="filter_inventory filter_ricet hasMousePopup"' + '" style="position: relative; background: url(https://jamzask.github.io/TWInventoryReloaded/small.png) no-repeat; cursor: pointer; background-position: -88px 0;" >' + '</span>');
                    receptare.click(function(e) {
                        $('#sumsearch').remove();
                        if (!TWIR_RecipesSearch.gui.popupMenu) {
                            if (isDefined(west.storage.ItemSetManager)) {
                                TWIR_RecipesSearch.gui.popupMenu = new west.gui.Selectbox().setWidth(175);
                                TWIR_RecipesSearch.gui.popupMenu.addListener(TWIR_RecipesSearch.findSet);
                                for (var i = 0; i < TW_Recepts.length; i++)
                                    TWIR_RecipesSearch.gui.popupMenu.addItem(i, TW_Recepts[i].name + '<img src="' + TW_Recepts[i].img + '" height="20" width="40">' + '<div style="padding-right: 20px; text-overflow:ellipsis; white-space:nowrap; overflow:hidden;"></div>');
                            }
                        }
                        TWIR_RecipesSearch.gui.popupMenu.show(e);
                    });
                    spanD.append(receptare);
                    var naboru = $('<span Title="' +
                        TWIRlang.Differ.tipsets + '" id="inventory_sety"' + '" class="filter_inventory filter_nabor hasMousePopup"' + '" style="cursor: pointer; position: relative; background: url(https://jamzask.github.io/TWInventoryReloaded/small.png) no-repeat; background-position: -131px 0;" >' + "</span>");
                    naboru.click(function(e) {
                        $('#sumsearch').remove();
                        selBox.show(e);
                    });
                    spanD.append(naboru);
                    $('.search_container').css('left', '35%').css('bottom', '10px');
                    $('.filters', Inventory.DOM).append(spanD);
                }
            }
        }
    };
    TWIR.gui.init = function() {
        TWIR.gui.makeButton = function(caption, callback) {
            return new west.gui.Button(caption, callback);
        };
    };

    function Storage(type, namespace) {
        var object = this;
        if (typeof(type) != "string")
            type = "session";
        switch (type) {
            case "local":
                {
                    object.storage = localStorage;
                }
                break;
            case "session":
                {
                    object.storage = sessionStorage;
                }
                break;
            default:
                {
                    object.storage = sessionStorage;
                }
                break;
        }
        if (!namespace || (typeof(namespace) != "string" && typeof(namespace) != "number"))
            namespace = "ScriptStorage";
        object.namespace = [namespace, "."].join("");
        object.setItem = function(key, value) {
            try {
                object.storage.setItem(escape([object.namespace, key].join("")), JSON.stringify(value));
            } catch (e) {}
        };
        object.getItem = function(key, defaultValue) {
            try {
                var value = object.storage.getItem(escape([object.namespace, key].join("")));
                if (value)
                    return eval(value);
                else
                    return defaultValue;
            } catch (e) {
                return defaultValue;
            }
        };
        object.removeItem = function(key) {
            try {
                object.storage.removeItem(escape(collection.craftfilterMarket(object.namespace, key).join("")));
            } catch (e) {}
        };
        object.keys = function() {
            var array = [];
            var indJack = 0;
            do {
                try {
                    var key = unescape(object.storage.key(indJack++));
                    if (key.indexOf(object.namespace) === 0 && object.storage.getItem(key))
                        array.push(key.slice(object.namespace.length));
                } catch (e) {
                    break;
                }
            } while (true);
            return array;
        };
    }
    $(document).ready(function() {
        try {
            TWIR.gui.init();
            ICONE.init();
            setTimeout(TWIR.Updater, 5000);
        } catch (e) {
            console.log(e.stack);
        }
    });
    var TWIR_QuickSearch = new Object();
    TWIR_QuickSearch.gui = {};
    TWIR_QuickSearch.gui.popupMenu = null;
    TWIR_QuickSearch.popup = function(button, e) {
        if (!TWIR_QuickSearch.gui.popupMenu) {
            TWIR_QuickSearch.gui.popupMenu = new west.gui.Selectbox().setWidth(200);
            TWIR_QuickSearch.gui.popupMenu.addListener(TWIR_QuickSearch.findSet);
            for (var i = 0; i < TW_Sets.length; i++)
                TWIR_QuickSearch.gui.popupMenu.addItem(i, TW_Sets[i].name);
        }
        TWIR_QuickSearch.gui.popupMenu.show(e);
    };
    TWIR_QuickSearch.findSet = function(id) {
        var items, base = TW_Sets[id].items,
            upgrade = TW_Sets[id].itemsk,
            invItems = [];
        if (base) {
            items = base;
        } else {
            items = [];
            for (var g = 0; g < upgrade.length; g++) {
                for (var h = 0; h <= 5; h++) {
                    items.push(upgrade[g] + h);
                }
            }
        }
        for (var i = 0; i < items.length; i++) {
            var invItem = Bag.getItemByItemId(items[i]);
            if (invItem)
                invItems.push(invItem);
        }
        if (invItems.length > 0) {
            if (!Bag.loaded) {
                var f = function(res) {
                    EventHandler.listen('inventory_loaded', function() {
                        Wear.open();
                        Inventory.showSearchResult(res);
                        return EventHandler.ONE_TIME_EVENT;
                    });
                    return Bag.loadItems();
                }(invItems);
            } else {
                Wear.open();
                Inventory.showSearchResult(invItems);
            }
        } else {
            new UserMessage(TWIRlang.customlang30, UserMessage.TYPE_HINT).show();
        }
    };
    var TWIR_RecipesSearch = new Object();
    TWIR_RecipesSearch.gui = {};
    TWIR_RecipesSearch.gui.rpopupMenu = null;
    TWIR_RecipesSearch.popup = function(button, e) {
        if (!TWIR_RecipesSearch.gui.rpopupMenu) {
            TWIR_RecipesSearch.gui.rpopupMenu = new west.gui.Selectbox().setWidth(200);
            TWIR_RecipesSearch.gui.rpopupMenu.addListener(TWIR_RecipesSearch.findSet);
            for (var i = 0; i < TW_Recepts.length; i++)
                TWIR_RecipesSearch.gui.rpopupMenu.addItem(i, TW_Recepts[i].name);
        }
        TWIR_RecipesSearch.gui.rpopupMenu.show(e);
    };
    TWIR_RecipesSearch.findSet = function(id) {
        var items, base = TW_Recepts[id].items,
            upgrade = TW_Recepts[id].itemsk,
            invItems = [];
        if (base) {
            items = base;
        } else {
            items = [];
            for (var g = 0; g < upgrade.length; g++) {
                for (var h = 0; h <= 5; h++) {
                    items.push(upgrade[g] + h);
                }
            }
        }
        for (var i = 0; i < items.length; i++) {
            var invItem = Bag.getItemByItemId(items[i]);
            if (invItem)
                invItems.push(invItem);
        }
        if (invItems.length > 0) {
            if (!Bag.loaded) {
                var f = function(res) {
                    EventHandler.listen('inventory_loaded', function() {
                        Wear.open();
                        Inventory.showSearchResult(res);
                        return EventHandler.ONE_TIME_EVENT;
                    });
                    return Bag.loadItems();
                }(invItems);
            } else {
                Wear.open();
                Inventory.showSearchResult(invItems);
            }
        } else {
            new UserMessage(TWIRlang.customlang30, UserMessage.TYPE_HINT).show();
        }
    };

   var OpenTrader = {
        init: function () {
			setTimeout((function () {
				setInterval(OpenTrader.checkTrader, 10000);
            }), 10000);

        },
		checkTrader: function(){
			if(OpenTrader.TraderTime == undefined){
				Ajax.remoteCallMode('shop_trader', 'index', {}, function (response) {
					OpenTrader.TraderTime = response.traderTime;
					if((OpenTrader.TraderTime -(new Date()).getTime() / 1000) > 86385) {
						west.window.shop.open('wear_window').showCategory('trader');
						Character.setToRead('trader', false);
					}
				});
			}
			if(Math.round((new Date()).getTime() / 1000) > OpenTrader.TraderTime){
				Ajax.remoteCallMode('shop_trader', 'index', {}, function (response) {
					OpenTrader.TraderTime = response.traderTime;
				});
				west.window.shop.open('wear_window').showCategory('trader');
				Character.setToRead('trader', false);
			}
		},
    };


    TWIR.Updater = function() {
        $.getScript(TWIR.updateUrl, function() {
            if (scriptUpdate.TWIR > TWIR.version) {
                var updateMessage = new west.gui.Dialog('TWIR - Update', '<span>'+ TWIRlang.customlang7 + TWIRlang.customlang10 + TWIRlang.customlang8 + '<a style="margin-left:15px;"href="javascript:void(PlayerProfileWindow.open(746376));">Jamza (CZ14)</a>' + TWIRlang.customlang9 + scriptUpdate.TWIR + '</b><br>' + scriptUpdate.TWIRNew + '</span>', west.gui.Dialog.SYS_WARNING).addButton('Update', function() {
                    updateMessage.hide();
                    location.href = TWIR.website + '/code.user.js';
                }).addButton('cancel').show();
            }
        });
    };
    setTimeout(TWIR.Updater, 4000);
    TWIR_QuickSearch.init();
    TWIR_RecipesSearch.init();
    featky.init();
});
