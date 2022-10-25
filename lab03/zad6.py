# from scp import SCPClient
# import paramiko
from simple_term_menu import TerminalMenu
import pysftp




path = "/home/klebiedzinski/semestr_3/ProtokolySieciWeb/zad6_file.txt"


options = ["put", "get"]
terminal_menu = TerminalMenu(options)
menu_entry_index = terminal_menu.show()
if options[menu_entry_index] == "put":
   with pysftp.Connection("sigma.ug.edu.pl", username="klebiedzinski", private_key="/home/karol/.ssh/klucze/sigma") as sftp:
      with sftp.cd('/home/klebiedzinski/semestr_3/ProtokolySieciWeb'):            
         sftp.put(path)  
else:
   with pysftp.Connection("sigma.ug.edu.pl", username="klebiedzinski", private_key="/home/karol/.ssh/klucze/sigma") as sftp:
       with sftp.cd('/home/klebiedzinski/semestr_3/ProtokolySieciWeb'):
         sftp.get(path,'/home/karol/Desktop/Studia/ProtokolySieciWeb/plikfromsigmula')
   






