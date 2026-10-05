#include<stdio.h>
#include<unistd.h>
#include <stdlib.h>
#include<sys/wait.h>
#include<sys/types.h>
int main(int argc, char const *argv[])
{
	int x=2;
	printf("Padre PID: %d X=%d\n", getpid(), x);

	if (vfork()==0)
	{
		x=5;
		printf("PID:%d PPID:%d, X=%d\n", (int)getpid(), (int)getppid(), x);
		if (vfork()==0)
		{
			x=3;
			printf("PID:%d PPID:%d, X=%d\n", (int)getpid(), (int)getppid(), x);
			_exit(0);
		}
		sleep(15);
		_exit(0);
	}
	printf("Padre PID: %d X=%d\n", getpid(), x);

	while(1);
	
	return 0;
}