#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"

if [[ -z $1 ]] 
then
  echo Please provide an element as an argument.
else
  if [[ "$1" =~ ^[0-9]+$ ]]
  then
    ATOMIC_NUMBER=$($PSQL "select atomic_number from elements where atomic_number=$1")
  else
    ATOMIC_NUMBER=$($PSQL "select atomic_number from elements where name='$1' OR symbol='$1' ")
  fi

  if [[ -z $ATOMIC_NUMBER ]]
  then
    echo I could not find that element in the database.
  else
    SYMBOL=$($PSQL "SELECT symbol from elements where atomic_number=$ATOMIC_NUMBER")
    NAME=$($PSQL "SELECT name from elements where atomic_number=$ATOMIC_NUMBER")
    NAME=$($PSQL "SELECT name from elements where atomic_number=$ATOMIC_NUMBER")
    TYPE_ID=$($PSQL "SELECT type_id from properties where atomic_number=$ATOMIC_NUMBER")
    TYPE=$($PSQL "SELECT type from types where type_id=$TYPE_ID")
    ATOMIC_MASS=$($PSQL "SELECT atomic_mass from properties where atomic_number=$ATOMIC_NUMBER")
    M_POINT=$($PSQL "SELECT melting_point_celsius from properties where atomic_number=$ATOMIC_NUMBER")
    B_POINT=$($PSQL "SELECT boiling_point_celsius from properties where atomic_number=$ATOMIC_NUMBER")

    echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $M_POINT celsius and a boiling point of $B_POINT celsius."
  fi
fi
