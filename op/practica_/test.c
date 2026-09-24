#include<stdio.h>
#include<unistd.h>

int int main(int argc, char const *argv[])
{
	int u, x, y;
	int hijos = 3;
	for (int i = 0; i < hijos; ++i)
	{
		x = fork();
		if (x==0)
		{
			break
		}
	}
	return 0;
}