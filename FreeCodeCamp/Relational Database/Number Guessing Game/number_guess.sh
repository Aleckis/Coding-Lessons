#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"  

NUMBER=$(($RANDOM % 1000 + 1))

echo "Enter your username:"
read NAME

# Check if the user exists in the database
USERNAME=$($PSQL "select username from guess_info where username='$NAME'")

if [[ -z $USERNAME ]]; then
  # New user
  INSERT=$($PSQL "insert into guess_info(username, games_played, best_game) values('$NAME', 1, 9999)")
  BEST_GAME=9999  # Initially set to a large number to ensure proper comparisons
  echo "Welcome, $NAME! It looks like this is your first time here."
else
  # Returning user
  GAMES_PLAYED=$($PSQL "select games_played from guess_info where username='$NAME'")
  BEST_GAME=$($PSQL "select best_game from guess_info where username='$NAME'")
  echo "Welcome back, $NAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
fi

echo "Guess the secret number between 1 and 1000:"
read GUESS

# Check if input is a valid integer
while ! [[ $GUESS =~ ^[0-9]+$ ]]; do
  echo "That is not an integer, guess again:"
  read GUESS
done

GUESSES_AMOUNT=1

# Game loop
while (( GUESS != NUMBER )); do
  ((GUESSES_AMOUNT++))
  if (( NUMBER < GUESS )); then
    echo "It's lower than that, guess again:"
  else
    echo "It's higher than that, guess again:"
  fi

  # Check again if the guess is a valid integer
  read GUESS
  while ! [[ $GUESS =~ ^[0-9]+$ ]]; do
    echo "That is not an integer, guess again:"
    read GUESS
  done
done

# Update the user's stats
UPDATE1=$($PSQL "update guess_info set games_played = games_played + 1 where username='$NAME'")

if (( GUESSES_AMOUNT < BEST_GAME )); then
  UPDATE2=$($PSQL "update guess_info set best_game = $GUESSES_AMOUNT where username='$NAME'")
fi

# Final output when the number is guessed correctly
echo "You guessed it in $GUESSES_AMOUNT tries. The secret number was $NUMBER. Nice job!"
