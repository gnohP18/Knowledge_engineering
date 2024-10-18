export const loginApi = async (email: string, password: string): Promise<any> => {
    try {
        const response = await fetch("/data/login.json", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error("Login API error:", error);
        throw error; 
    }
};

interface SignupData {
    first_name: string;
    last_name: string;
    email: string;
    job_title: string;
    address: string;
    address_detail: string; 
    password: string;
    confirmPassword: string;
}

export const signupApi = async (data: SignupData): Promise<any> => {
    try {
        const response = await fetch("/data/signup.json", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        return responseData.data;
    } catch (error) {
        console.error("Signup API error:", error);
        throw error; 
    }
};