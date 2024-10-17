#include <stdio.h>

int mod = 1000000007;

long long int weird_factorial(int n) {
    long long int result = 1;
    for (int i = 1; i <= n; i++) {
        if (n % i == 0) continue;
        result = (result * i) % mod;
    }
    return result;
}

int main() { 
	int n;
	scanf("%d", &n);
	printf("%lld", weird_factorial(n));
	return 0;
}