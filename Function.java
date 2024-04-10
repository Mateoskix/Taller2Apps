public class Function {
    public static void main(String[] args) {
        // Test your function here
        System.out.println(diffSubstring("abcabcbb"));
        System.out.println(diffSubstring("bbbbb"));
        System.out.println(diffSubstring("pwwkew"));
    }
    
    public static String diffSubstring(String str) {
        int n = str.length();
        String res = "";
        for (int i = 0; i < n; i++) {
            String temp = "";
            for (int j = i; j < n; j++) {
                if (temp.indexOf(str.charAt(j)) == -1) {
                    temp += str.charAt(j);
                } else {
                    break;
                }
            }
            if (temp.length() > res.length()) {
                res = temp;
            }
        }
        return res;
    }
}