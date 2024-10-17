#include <stdio.h>

int count_digits(int n) {


    // If the number is negative, take its absolute value
    if (n < 0) n = -n;

    int count = 0;
    while (n > 0) {
        count++;
        n /= 10; // Remove the last digit
    }
    return count;
}

int main() { 
	int n;
	scanf("%d", &n);
	printf("%d", count_digits(n));
	return 0;
}