const main = document.querySelector('#main');
const startNumber = 20;
const newUser = (fav) => {
    return {
        image: faker.fake('{{image.avatar}}'),
        name: faker.fake('{{name.firstName}} {{name.lastName}}'),
        userName: faker.fake('{{internet.userName}}'),
        favorite: fav
    }
}
class App extends React.Component {
    constructor() {
        super();
        //create users
        const users = [];
            for (let i=0; i<startNumber; i++){
                let bool = Math.random() > 0.5;
                users.push(newUser(bool));
            };
        
        this.state = {users}
        
        //favorite count
    }

    render(){
        const { users} = this.state;
        const favoriteCount = () => {
            return users.reduce( ( acc , user ) => ( user.favorite ? acc+1 : acc), 0);
        }
        const toggleFavorite = (ev) => {
            const idx = [...ev.target.parentNode.children].indexOf(ev.target)-1;
            users[idx].favorite = users[idx].favorite? false : true;
            this.setState({users});
        }
        const addUser = () => {
            users.unshift(newUser(true));
            this.setState({users});
        }
        //button
        const linkText = `You have ${favoriteCount()} favorite users!`;
        const addBtn = React.createElement('div', { onClick:addUser, className:'btn' }, linkText); 
        const userList = users.map( (user, idx) => {
            const isFavorite = user.favorite ? 'isFavorite' : '';
            const avator = React.createElement('img', {src: user.image, className:'avator'}, null);
            const userName = React.createElement('div', {className:'info'}, user.name);
            const userUserName = React.createElement('div', {className:'info'}, user.userName);
            return React.createElement('li', {key:idx, className: isFavorite, onClick:toggleFavorite}, avator, userName, userUserName);
        })
        const app = React.createElement('ul', null, addBtn, userList);
        return app;
    }
}

ReactDOM.render(React.createElement(App), main);