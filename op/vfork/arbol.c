#include<stdio.h>
#include<unistd.h>
#include <stdlib.h>
#include<sys/wait.h>
#include<sys/types.h>
int main(int argc, char const *argv[])
{
	int hijos = 4;
	int i;
	for (int i = 0; i < hijos; ++i)
	{
		if (!fork())
		{
			break;
			//_exit(0);
		}
	}
	//while(1);
	return 0;
}