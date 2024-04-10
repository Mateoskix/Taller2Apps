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
    }

    public static void numbers(int[] digits) {
        int[][] phone = new int[3][9];
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 9; j++) {
                phone[i][j] = 1;
                System.out.print(phone[i][j]);
            }
            System.out.println();
        }
    }
}
