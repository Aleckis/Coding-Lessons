#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=salon --tuples-only --no-align -c"

echo -e "\n ~~~~ Salon Program ~~~~ \n\n"

MAIN_MENU() {
  echo "Select the desired service"
  echo -e "\n1) Haircut\n2) Manicure\n3) Pedicure"

  read SERVICE_ID_SELECTED

  case $SERVICE_ID_SELECTED in
    1) HANDLE_APPOINTMENT "Haircut" ;;
    2) HANDLE_APPOINTMENT "Manicure" ;;
    3) HANDLE_APPOINTMENT "Pedicure" ;;
    *) MAIN_MENU ;;
  esac
}

HANDLE_APPOINTMENT() {
  SERVICE_NAME=$1
  echo -e "\nEnter a phone number (XXX-XXXX)"
  read CUSTOMER_PHONE

  # Check if the customer exists
  CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$CUSTOMER_PHONE'")

  # If the customer doesn't exist, add them
  if [[ -z $CUSTOMER_NAME ]]
  then
    echo -e "\nEnter your name"
    read CUSTOMER_NAME
    INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers(name, phone) VALUES('$CUSTOMER_NAME', '$CUSTOMER_PHONE')")
  fi

  # Get customer ID
  CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE'")

  echo -e "\nEnter a time for the appointment"
  read SERVICE_TIME

  # Insert appointment
  INSERT_APPOINTMENT_RESULT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES('$CUSTOMER_ID','$SERVICE_ID_SELECTED','$SERVICE_TIME')")

  echo -e "\nI have put you down for a $SERVICE_NAME at $SERVICE_TIME, $CUSTOMER_NAME."
}

MAIN_MENU
