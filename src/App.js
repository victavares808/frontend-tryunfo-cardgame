import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.button = this.button.bind(this);

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: '',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      hasTrunfo: false,
      saveCards: [],
    };
  }

  onSaveButtonClick() {
    const {
      cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage, cardRare, cardTrunfo, saveCards,
    } = this.state;

    this.setState((prevState) => ({
      saveCards: [...prevState.saveCards,
        {
          cardName,
          cardDescription,
          cardRare,
          cardAttr1,
          cardAttr2,
          cardAttr3,
          cardImage,
          cardTrunfo,
        },
      ],
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
    }));
    if (cardTrunfo === true) {
      this.setState({ hasTrunfo: true });
    }
  }

  onInputChange({ target }) {
    const { name } = target;
    const valor = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: valor,
    }, () => this.button(valor));
  }

  chiuaua() {
    const { saveCards } = this.state;
    const newCards = saveCards.some((element) => element.cardTrunfo === true);
    this.setState({
      hasTrunfo: newCards,
    });
  }

  button(value) {
    const { cardAttr1, cardAttr2, cardAttr3, isSaveButtonDisabled } = this.state;
    const zero = 0;
    const noventa = 90;
    const cardAtt1 = parseInt(cardAttr1, 10);
    const cardAtt2 = parseInt(cardAttr2, 10);
    const cardAtt3 = parseInt(cardAttr3, 10);
    const duz = 210;
    const p = this.setState({
      isSaveButtonDisabled: true,
    });
    if (value.length === 0 && isSaveButtonDisabled === false) {
      this.setState({
        isSaveButtonDisabled: true,
      });
    } else if ((cardAtt1 > noventa) || (cardAttr1 < zero)) {
      return p;
    } else if ((cardAtt2 > noventa) || (cardAtt2 < zero)) {
      return p;
    } else if ((cardAtt3 > noventa) || (cardAtt3 < zero)) {
      return p;
    } else if ((cardAtt1 + cardAtt2 + cardAtt3) > duz) {
      return p;
    } else {
      this.setState({
        isSaveButtonDisabled: false,
      });
    }
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      saveCards,
    } = this.state;

    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <div>
          <Card
            cardName={ cardName }
            cardDescription={ cardDescription }
            cardAttr1={ cardAttr1 }
            cardAttr2={ cardAttr2 }
            cardAttr3={ cardAttr3 }
            cardImage={ cardImage }
            cardRare={ cardRare }
            hasTrunfo={ hasTrunfo }
            cardTrunfo={ cardTrunfo }
          />
        </div>
        {
          saveCards.map((card) => (
            <div key={ card.cardName }>
              <Card
                cardName={ card.cardName }
                cardDescription={ card.cardDescription }
                cardAttr1={ card.cardAttr1 }
                cardAttr2={ card.cardAttr2 }
                cardAttr3={ card.cardAttr3 }
                cardImage={ card.cardImage }
                cardRare={ card.cardRare }
                hasTrunfo={ card.hasTrunfo }
                cardTrunfo={ card.cardTrunfo }
              />
            </div>
          ))
        }
      </div>
    );
  }
}

export default App;
