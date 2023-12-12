def welcome():
  entry= int(input("""Welcome to phonebook.
                  >>>Phonebook comands are:1,2,3,4,5<<<
                  >>>What would you like to do?<<<
                  1.Display contacts
                  2.Create new contact
                  3.Check an entry
                  4.Delete an entry
                  5.Exit
                  Enter your entry:  """))
  return entry

def phonebook():
  contact = {}
  while True
    entry=welcome()
    if entry == 1:
      if bool(contact) !=False:
        for k, v in contact.items():
          print(k,'-->', v)
      else:
        print('Phonebook is empty')
    elif entry == 2:
      phone_number = input('Enter a number: ')
      contact_name = input('Enter FirstName, LastName: ')
      if phone_number not in contact.items():
        contact.update({contact_name:phone_number})
        print('Contact saved')
        print('Updated as shown below: ')
        for k, v in contact.items():
          print(k, '-->', v)
      else:
        print('That contact already exists')
    elif entry == 3:
      name = input('Enter Name: ')
      if name in contact:
        print('The contact is ', name, ':', contact[name])
      else:
        print('Not found')
    elif entry == 4:
      name = input('Enter Name to Delete contact: ')
      if name in contact:
        print('The contact is ', name, ':', contact[name])
      confirm = input('Delete Yes/No: ')
      if confirm.capitalize() == 'Yes':
        contact.pop(name,None)
        for k, v in contact.items():
          print('Updated as shown below: ')
          print(k, '-->', v)
      else:
        print('Return to menu')
    elif entry == 5:
      print('Bye')
      break
    else:
      print('Not a comand')
