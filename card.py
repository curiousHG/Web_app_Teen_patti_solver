from details import heirarchies, numbers, suits, gameTypes


class Card:
    def __init__(self, suit, number):
        """Making Card object with suit and Number"""
        self.suit = suits[suit]
        self.number = numbers[number]


card1=Card("spade",2)
print(card1.number)