from player import Player
from card import Card
from details import heirarchies, numbers, suits, gameTypes
import random


def winnerAction(winner):
    """We can create some other function other than this
    such as highlighting the winner's card background"""
    if winner != 0:
        print("Player", winner, "won.")
    else:
        print("Tie")


class game:
    def __init__(self, gameType):
        """gameType is a string"""
        self.gameType = gameType
        self.cardsDealt = gameTypes[gameType]
        self.P1 = Player()
        self.P2 = Player()

    def setCard(self, player_id, suit, num):
        """appends card object to player of given player_id
        inputs are player_id,suit code(0,1,2,3) and num(2,3,4,'a','k','q')"""
        if player_id == 1:
            if len(self.P1.cards) < self.cardsDealt:
                self.P1.cards.append(Card(suit, num))
            else:
                if len(self.P2.cards) < self.cardsDealt:
                    """We can automatically switch to player 2 and fix it"""
                    print("Enter cards for player 2")
                else:
                    """We can disable the enter button and activate the compare button"""
                    print("Initiate compare")
        elif player_id == 2:
            if len(self.P2.cards) < self.cardsDealt:
                self.P2.cards.append(Card(suit, num))
            else:
                if len(self.P1.cards) < self.cardsDealt:
                    """We can automatically switch to player 1"""
                    print("Enter cards for player 1")
                else:
                    """We can disable the enter button and activate the compare button"""
                    print("Initiate compare")
        return True

    def gameType_Classic(self):
        p1 = [self.P1.hierarchy] + self.P1.hierarchyNumber
        p2 = [self.P2.hierarchy] + self.P2.hierarchyNumber
        for i in range(len(p1)):
            if p1[i] > p2[i]:
                winnerAction(1)
                break
            elif p1[i] < p2[i]:
                winnerAction(2)
                break

    def gameTypeMethodDecider(self):
        if self.gameType == "Classic":
            self.gameType_Classic()

    def compare(self):
        if len(self.P1.cards) == self.cardsDealt and len(self.P2.cards) == self.cardsDealt:
            self.P1.hierarchy_decider()
            self.P2.hierarchy_decider()
            self.gameTypeMethodDecider()
        else:
            print("Enter More cards")

    def reset(self):
        self.P1 = Player()
        self.P2 = Player()


"""Stream Looks like this"""
# gT = "Classic"
# g = game(gT)
# g.compare()
# g.setCard(1, "spade", 2)
# g.setCard(1, "spade", "a")
# g.setCard(1, "spade", 3)
# g.setCard(2, "spade", "a")
# g.setCard(2, "spade", "k")
# g.setCard(2, "spade", "q")
# g.compare()

"""Python Testing Code"""
testing_iterations = 10
s = [(k) for k, v in suits.items()]
n = [(k) for k, v in numbers.items()]
print(n)
for i in range(testing_iterations):
    p1, p2 = [], []
    gT = "Classic"
    g = game(gT)
    cards = []
    for j in range(3):
        t, suit, num = True, None, None
        while t:
            suit = random.choice(s)
            num = random.choice(n)
            if [suit, num] not in cards:
                cards.append([suit, num])
                break
        t = g.setCard(1, suit, num)
        p1 += [[suit, num]]
    for j in range(3):
        t, suit, num = True, None, None
        while t:
            suit = random.choice(s)
            num = random.choice(n)
            if [suit, num] not in cards:
                cards.append([suit, num])
                break
        t = g.setCard(2, suit, num)
        p2 += [[suit, num]]
    print(p1, p2)
    g.compare()
