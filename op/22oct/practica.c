#include<stdio.h>
#include<unistd.h>
#include<pthread.h>
#include<sys/syscall.h>

void *tarea(void *a){
	printf("Hola desde el hilo, estoy en el proceso %d y  mi id es: %d\n",
	 (int)getpid(), (int)(SYS_gettid));
	while(1);
	return 0;
}

void crear_hilos(pthread_t hilo){
		int valor = pthread_create(&hilo, NULL, tarea, NULL);
		if (valor!=0)
		{
			printf("El hilo no fue creado \n");
		}else{
			printf("El hilo fue creado satisfactoriamente \n");
		}
	
}


int main(int argc, char const *argv[])
{
	char id1 

	printf("Soy el proceso %d, mi id de hilo es: %d\n",
	 (int)getpid(), (int)(SYS_gettid));

	pthread_t hilo;
	pthread_t hilo1;

	crear_hilos(hilo);
	crear_hilos(hilo1);

	pthread_join(hilo, NULL);
	while(1);
	return 0;
}