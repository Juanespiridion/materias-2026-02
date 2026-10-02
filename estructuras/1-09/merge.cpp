#include<iostream>
/*
void OrdenarPorBUrbuja(int* datos, int N){
	for (int M = N-1; M>=1; M--)
	{
		
	}
}
*/

void merge(int* datos, int iniIz, int finIzq, int iniDer, finDer){
	int N = (finIzq - finDer + 1)+(finDer-iniDer+1);
	if (N<=0) {
		std::cout<<"ERROR: en la asignacion de memoria"<<endl;
		return;
	}

	int *datoTmp = new int[]

	while(true){
		if (datos[iniIz])
		{
			/* code */
		}
	}

}

void mergeSort(int* datos, int ini, int fin){
	int indCentral = (ini + fin) / 2;
	if (ini<indCentral)//Ordena lista izquierda
		mergeSort(datos, ini, indCentral);

	if (ini<indCentral)//Ordena lista derecha
		mergeSort(datos, ini, indCentral);
	merge(datos, indCentral, indCentral+1);
}

int main(int argc, char const *argv[])
{
	return 0;
}