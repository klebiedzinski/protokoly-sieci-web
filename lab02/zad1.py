from sys import stdin, stdout
import paramiko

hostname = "sigma.ug.edu.pl"
port = 22
user = "klebiedzinski"

client = paramiko.SSHClient()
client.load_system_host_keys("/home/karol/.ssh/klucze/sigma")
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(hostname, port=port, username=user)

stdin, stdout, stderr = client.exec_command("who")
print(stdout.read().decode())
client.close()