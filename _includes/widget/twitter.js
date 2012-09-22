new TWTR.Widget({
version: 2,
type: 'profile',
rpp: 4,
interval: 30000,
width: 125,
height: 300,
theme: {
shell: {
background: '#333333',
color: '#ffffff'
},
tweets: {
background: '#000000',
color: '#ffffff',
links: '#4aed05'
}
},
features: {
scrollbar: false,
loop: false,
live: false,
behavior: 'all'
}
}).render().setUser('tsucchi').start();
