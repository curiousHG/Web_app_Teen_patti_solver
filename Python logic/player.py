from card import Card
from details import heirarchies, numbers, suits, gameTypes


class Player:
    def __init__(self):
        self.cards = []
        # hierarchy is a int
        self.hierarchy = None
        # hierarchy number is a list
        self.hierarchyNumber = None

    def suitChecker(self):
        """Returns True is cards suit is same"""
        if self.cards[0].suit == self.cards[1].suit == self.cards[2].suit:
            return True

    def numberChecker(self):
        """Returns True if all cards have same numbers"""
        if self.cards[0].number == self.cards[1].number == self.cards[2].number:
            return True

    def sequenceChecker(self):
        """Returns True if the cards form any sequence and sets sequenceHierarchy"""
        l = [card.number for card in self.cards]
        l.sort()
        """Considering A23 the highest sequence"""
        if l == [2, 3, 14]:
            self.hierarchyNumber = [12]
            return True
        elif l[2] - l[0] == 2:
            self.hierarchyNumber = [l[0] - 1]
            return True
        return False

    def pairChecker(self):
        """Checks if cards contain a pair and sets hierarchyNumber to a list
        where first element is pair number and second is number of the remaining card"""
        l = [card.number for card in self.cards]
        l.sort()
        if l[1] == l[0]:
            self.hierarchyNumber = [l[1], l[2]]
            return True
        elif l[1] == l[2]:
            self.hierarchyNumber = [l[1], l[0]]
            return True
        return False

    def hierarchy_decider(self):
        if self.numberChecker():
            self.hierarchy = heirarchies["Trail"]
            self.hierarchyNumber = [self.cards[0].number]

        elif self.sequenceChecker():
            if self.suitChecker():
                self.hierarchy = heirarchies["PureSeq"]
            else:
                self.hierarchy = heirarchies["Seq"]
        elif self.suitChecker():
            self.hierarchy = heirarchies["Color"]
            cards = [card.number for card in self.cards]
            cards.sort()
            self.hierarchyNumber = list(reversed(cards))
        elif self.pairChecker():
            self.hierarchy = heirarchies["Pair"]
        else:
            self.hierarchy = heirarchies["HighCard"]
            cards = [card.number for card in self.cards]
            cards.sort()
            self.hierarchyNumber = list(reversed(cards))

# Test
# l=[Card(0,'a'),Card(1,"a"),Card(2,"a")]
# p=Player()
# p.cards=l
# p.hierarchy_decider()
# print(p.hierarchy,p.hierarchyNumber)
