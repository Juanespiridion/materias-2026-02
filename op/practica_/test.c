#include<stdio.h>
#include<unistd.h>

int main()
{
	int i, u, x, y;
	int hijos = 3;
	for (i = 0; i < hijos; ++i)
	{
		x = fork();
		if (x==0)
		{
			break;
		}
	}
	switch(i){
		case 0: { fork();} 
		case 1: { fork();}
		case 3: { printf("Soy el padre\n");}
	}
	while(1);
	return 0;
}