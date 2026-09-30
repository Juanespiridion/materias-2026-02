#include<stdio.h>
#include<unistd.h>
#include<stdlib.h>
#include<sys/types.h>
#include<sys/wait.h>

int main(int argc, char const *argv[])
{
	printf("Soy el padre con ID: %d\n", (int)getpid());

	int x = vfork();
	if(x!=0){
		printf("Ya termino mi hijo");
		while(1);
	}else{
		printf("Soy el hijo con ID: %d\n", (int)getpid());
		while(1);
		_exit(0);
	}
	return 0;
}