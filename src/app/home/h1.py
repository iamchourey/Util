number=int(input("enter a number"))
for i in range(number):
  print(" "*(number-i-1),end=" ")
  print("*"*(2*i+1),end=" ")
  print(" "*(number-i-1))


