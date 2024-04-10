import java.util.Scanner;

public class Function2 {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String input;
        int inputLength;

        do {
            System.out.print("Ingresa digitos entre 2 y 9: ");
            input = scanner.nextLine();
            inputLength = input.length();
        } while (inputLength == 0 || inputLength > 4 || !input.matches("[2-9]+"));

        int[] digits = new int[inputLength];
        for (int i = 0; i < inputLength; i++) {
            digits[i] = Character.getNumericValue(input.charAt(i));
        }

        numbers(digits);

        scanner.close();
    }

    public static void numbers(int[] digits) {
        char[][] phone = new char[8][4];
        phone[0] = new char[] { 'a', 'b', 'c' };
        phone[1] = new char[] { 'd', 'e', 'f' };
        phone[2] = new char[] { 'g', 'h', 'i' };
        phone[3] = new char[] { 'j', 'k', 'l' };
        phone[4] = new char[] { 'm', 'n', 'o' };
        phone[5] = new char[] { 'p', 'q', 'r', 's' };
        phone[6] = new char[] { 't', 'u', 'v' };
        phone[7] = new char[] { 'w', 'x', 'y', 'z' };

        // Encontrar cantidad de combinaciones
        int combinations = 1;
        for (int i = 0; i < digits.length; i++) {
            combinations *= phone[digits[i] - 2].length;
        }
        String[] res = new String[combinations];

        // Encontrar combinaciones
        int[] indices = new int[digits.length];
        for (int i = 0; i < combinations; i++) {
            StringBuilder combination = new StringBuilder();
            for (int j = 0; j < digits.length; j++) {
                combination.append(phone[digits[j] - 2][indices[j]]);
            }
            res[i] = combination.toString();

            // Update indices for the next combination
            for (int j = digits.length - 1; j >= 0; j--) {
                if (indices[j] < phone[digits[j] - 2].length - 1) {
                    indices[j]++;
                    break;
                } else {
                    indices[j] = 0;
                }
            }
        }
        for (String s : res) {
            System.out.println(s);
        }
    }
}
