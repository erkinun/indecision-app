console.log('App.js is running and everythings cool!');

const app = {
    title: 'Indecision App',
    subTitle: 'I will help you make a decision today!',
    options: []
};

function getOptions(app) {
    if (app.options && app.options.length > 0) {
        return <p>Here are your options!</p>
    }
    else {
        return <p>No options!</p>
    }
}

const onFormSubmit = (e) => {
    e.preventDefault();

    const option = e.target.elements.option.value;

    if (option) {
        app.options.push(option);
        e.target.elements.option.value = '';

        render();
    } 
}

const makeDecision = () => {
    const random = Math.floor(Math.random() * app.options.length);
    const selection = app.options[random];
    alert(selection);
}

const onRemove = () => {
    
    app.options = [];
    render();
}

const render = () => {

    // JSX - JavaScript XML
    const template = (
        <div>
            <h1>{app.title}</h1>
            {app.subTitle && <p>{app.subTitle}</p>}
            {getOptions(app)}
            <p>{app.options.length}</p>
            <button onClick={makeDecision}  disabled={app.options.length === 0}>What should I do?</button>
            <button onClick={onRemove}>Remove All</button>
            <ol>
                {
                    app.options.map((option) => {
                        return <li key={option}>{option}</li>;
                    })
                }
            </ol>

            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        </div>
    );

    const appRoot = document.getElementById('app');
    
    ReactDOM.render(template, appRoot);
}
 

render();

