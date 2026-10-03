#include<stdio.h>
#include<unistd.h>
#include<stdlib.h>
#include<sys/wait.h>
#include <stdbool.h>

//A
int factorial(int n){
	if (n<=1)	return 1;
	return n * factorial(n-1);
}
//A1
int cuadrado(int n){
	return n*n;
}

//B
int suma_enteros(int n){
	if (n<=1) return 1;
	return n + suma_enteros(n-1);
}

//B1
bool verificar_primos(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; ++i) {
        if (n % i == 0) return false;
    }
    return true;
}

int primos(int n) {
    int cont = 0;
    for (int i = 2; i <= n; ++i) {
        if (verificar_primos(i)) {
            cont += 1;
        }
    }
    return cont;
}

//C
int divisores(int n){
	int cont = 1;
	for (int i = 1; i < n; ++i)
	{
		if (n%i==0)
		{
			cont++;
		}
	}
	return cont;
}



void mensaje(char tarea[], int hijo, int padre){
	puts("----------------------------------------------------------------------------------");
	printf("%s - Id:%d Proceso padre ID: %d\n",tarea, hijo, padre);
}

int main(int argc, char *argv[])
{
	int i, n, t;
	int hijos = 3;
	puts("-----------------------------------------------");
	printf("PROCESO PADRE ID: %d\n", getpid());
	printf("Ingresa un numero entre 1 y 12: ");
	scanf("%d", &n);

	printf("Operaciones para el numero: %d\n", n);
	for (i = 0; i < hijos; ++i)
	{
		pid_t pid =	fork();
		if (pid == 0)
		{
			switch(i){
				case 0: //A
					t = factorial(n);
					mensaje("Tarea A: Factorial", getpid(), getppid());
					printf("Factorial de %d: %d\n\n",n,t);
					if (fork() == 0) { //A1
	                    t = cuadrado(n);
	                    mensaje("Tarea A1: Calcular cuadrado de N", getpid(), getppid());
	                    printf("Cuadrado de %d: %d\n\n", n, t);
	                    exit(0);
	                }
					wait(NULL);
					exit(0);
				case 1: //B
					t = suma_enteros(n);
					mensaje("Tarea B: Suma de enteros de 1 a N", 
						getpid(), getppid());
					printf("Suma de los enteros de 1 a %d: %d\n\n", n, t);
					if (fork() == 0) { //B1
	                    t = primos(n);
	                    mensaje("Tarea B1: Primos de 1 a N", getpid(), getppid());
	                    printf("Hay %d numeros primos de 1 a %d\n\n", t, n);
	                    exit(0);
                	}
               		wait(NULL); 
                	exit(0);    
				case 2: //C
					t = divisores(n);
					mensaje("Tarea C: Divisores de N",
					 getpid(), getppid());
					printf("Divisores de %d: %d\n\n", n, t);
					exit(0);
			}
		}
		wait(NULL);
	}

	//while(1);
	return 0;
}
