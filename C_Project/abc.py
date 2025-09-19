import os

BOARD_SIZE = 15

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def print_board(board):
    print("   " + " ".join(f"{i:2}" for i in range(BOARD_SIZE)))
    for idx, row in enumerate(board):
        print(f"{idx:2} " + " ".join(row))

def check_win(board, x, y, player):
    directions = [(1,0), (0,1), (1,1), (1,-1)]
    for dx, dy in directions:
        count = 1
        for dir in [1, -1]:
            nx, ny = x, y
            while True:
                nx += dx * dir
                ny += dy * dir
                if 0 <= nx < BOARD_SIZE and 0 <= ny < BOARD_SIZE and board[nx][ny] == player:
                    count += 1
                else:
                    break
        if count >= 5:
            return True
    return False

def main():
    board = [["." for _ in range(BOARD_SIZE)] for _ in range(BOARD_SIZE)]
    players = ["X", "O"]
    turn = 0

    while True:
        clear_screen()
        print_board(board)
        player = players[turn % 2]
        print(f"Player {player}'s turn.")
        try:
            move = input("Enter row and column (e.g. 7 7): ")
            x_str, y_str = move.strip().split()
            x, y = int(x_str), int(y_str)
            if not (0 <= x < BOARD_SIZE and 0 <= y < BOARD_SIZE):
                print("Invalid position. Try again.")
                input("Press Enter to continue...")
                continue
            if board[x][y] != ".":
                print("Cell already taken. Try again.")
                input("Press Enter to continue...")
                continue
            board[x][y] = player
            if check_win(board, x, y, player):
                clear_screen()
                print_board(board)
                print(f"Player {player} wins!")
                break
            turn += 1
        except Exception:
            print("Invalid input. Please enter two numbers separated by space.")
            input("Press Enter to continue...")

if __name__ == "__main__":
    main()