Vue.config.devtools = true;

const newApp = new Vue({
    el: "#root",
    data: {
        currentActiveContact: '0',
        typedText: '',
        contactNameFilter:'',
        contacts: [
            {
                name: 'Michele',
                avatar: '_1',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Hai portato a spasso il cane?',
                        status: 'sent',
                        clicked: false,

                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Ricordati di dargli da mangiare',
                        status: 'sent',
                        clicked: false,
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        text: 'Tutto fatto!',
                        status: 'received',
                        clicked: false,
                    }
                ],
                lastAccess: '',
            },
            {
                name: 'Fabio',
                avatar: '_2',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        text: 'Ciao come stai?',
                        status: 'sent',
                        clicked: false,
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        text: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received',
                        clicked: false,
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent',
                        clicked: false,
                    }
                ],
                lastAccess: '',
            },
            {
                name: 'Sara',
                avatar: '_3',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        text: 'La Marianna va in campagna',
                        status: 'received',
                        clicked: false,
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        text: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent',
                        clicked: false,
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        text: 'Ah scusa!',
                        status: 'received',
                        clicked: false,
                    }
                ],
                lastAccess: '',
            },
            {
                name: 'Luisa',
                avatar: '_4',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        text: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent',
                        clicked: false,
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        text: 'Si, ma preferirei andare al cinema',
                        status: 'received',
                        clicked: false,
                    }
                ],
                lastAccess: '' ,
            },
        ]
    },
    methods: {
        activeChat: function(index) {
            this.currentActiveContact = index;
        },
        sendTextMessage: function() {
            // Generate element
            this.contacts[this.currentActiveContact].messages.push({
                date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                text: this.typedText,
                status: 'sent'
            });
            // Reset text box
            this.typedText = '' ;
            // Automated reply
            const botAnswer = setTimeout(() => {
                this.contacts[this.currentActiveContact].messages.push({
                    date: dayjs().format('DD/MM/YYYY HH:mm:ss'),
                    text: 'ok',
                    status: 'received'
                });
            }, 1000);
        },
        filterContactByName: function () {
            this.contacts.forEach(element => {
                if (element.name.toLowerCase().includes(this.contactNameFilter.toLowerCase())){
                    element.visible = true;
                } else {
                    element.visible = false;
                }
            });
        },
        showMessageMenu: function(index) {

            if (this.contacts[this.currentActiveContact].messages[index].clicked) {
                this.contacts[this.currentActiveContact].messages[index].clicked = !this.contacts[this.currentActiveContact].messages[index].clicked
            } else {
                this.contacts[this.currentActiveContact].messages.forEach(element => {
                    if (element.clicked) {
                        element.clicked = !element.clicked
                    }
                })
                this.contacts[this.currentActiveContact].messages[index].clicked = !this.contacts[this.currentActiveContact].messages[index].clicked
            }
        },
        getRandomIntInclusive: function(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
        },
        getRandomLastAccess: function() {
            this.contacts.forEach(element => {
                const randomDay = this.getRandomIntInclusive(1, 31);
                const randomMonth = this.getRandomIntInclusive(1, 12);
                const randomHour = this.getRandomIntInclusive(0, 12);
                const randomMinute = this.getRandomIntInclusive(0, 59);
                const randomSecond = this.getRandomIntInclusive(1, 59);

                element.lastAccess = `${randomDay}/${randomMonth}/2021 alle ${randomHour}:${randomMinute}`;
            });   
        }
    },
    created() {
        this.getRandomLastAccess();
    }
});





