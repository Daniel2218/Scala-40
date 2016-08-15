var AIcard = (function(Deck){

	var my = {}, key;

	for (key in Deck){
		if(Deck.hasOwnProperty(key)){
			my[key] = Deck[key];
		}
	}

	my.Build = function(_value,_suit){
		CardClass.Card.call(this, _value, _suit);
		console.log(this);
		this._set = {
			Cards : [],
			Prob : 0,
			Num : 0
		}

		this._straight = {
			Cards : [],
			Prob : 0,
			Num : 0
		}	
		
		this.isSetWith = function(otherCard){
			return (this.getValue() == otherCard.getValue() && this.getSuit() != otherCard.getSuit());
		}

		this.isStraightWith = function(otherCard, hand){
			if (this.getSuit() == otherCard.getSuit()){
				var difference  = this.getValue() - otherCard.getValue();
				if(Math.abs(difference) <= 1){ // rewrite this
			 		return true;
			 	} else {
			 		for (var i = 0; i < Math.abs(difference) - 1; i++) {
			 			var newCard;
			 			if(difference < 0){
			 				newCard = otherCard.Down();
			 			} else {
			 				newCard = otherCard.Up();
			 			}
			 			if(typeof newCard == "object"){
				 			return found = (function (){
								for (var j = 0; j < hand.length; j++) {
					 				if(newCard.equals(hand[j])){
					 					return true;
					 				}
					 			}
					 			return false;	
							})();
						} else {
							return false;
						}
			 		}
			 	}
			}
			return false;
		}
		this.Up = function(){
			if(this.getValue() > 13){
				return false;
			}
			return new CardClass.Card(this.getValue()+1, this.getSuit());
		}
		this.Down = function(){
			if(this.ifAce()){
				return false;
			}
			return new CardClass.Card(this.getValue()-1, this.getSuit());
		}
		this.setProb = function(){
			var result = 1;
			var lengthOfset = this._set.Cards.length;
			for (var i = 0; i < (3 - lengthOfset); i++) {
				result *= (8 - (lengthOfset + i)*2)/(my.CardsLeft - i);
			}
			this._set.Prob = result;
		}
		this.setStraightProb = function(){
			var result = 1;
			var lengthOfstraight = this._straight.Cards.length;
			for (var i = 0; i < (3 - lengthOfstraight); i++) {
				result *= (4 - 2*this.ifAce())/(my.CardsLeft - i);
			}
			this._straight.Prob = result;
		}	
		this.ifAce = function(){
			var length = this._straight.Cards.length;
			for (var i = 0; i < length; i++) {
				if (_straight.Cards[i].getValue() == 1){
					return true;
				}
			}
			return false;
		}

		this.equals = function(otherCard){
			return (this.getValue() == otherCard.getValue() && this.getSuit() == otherCard.getSuit());
		}
	}

	
	return my;

})(Deck);
