from sympy import symbols, Eq, diff, solve

F, m, a = symbols('F m a')

segunda_ley = Eq(F, m * a)

try:
    masa = float(input("(m): "))
    aceleracion = float(input("(a): "))

    fuerza = solve(segunda_ley.subs([(m, masa), (a, aceleracion)]), F)

    print(f"La fuerza (F) aplicada al objeto es igual a {fuerza[0]} Newtons.")
except ValueError:
    print("Ingrese valores válidos para la masa y la aceleración.")
except Exception as e:
    print(f"Ocurrió un error: {e}")


v, t = symbols('v t')

ley_de_newton = Eq(v.diff(t), 0)

solucion = solve(ley_de_newton, v)

print("La solución a la ecuación dv/dt = 0 es:")
print("v =", solucion)