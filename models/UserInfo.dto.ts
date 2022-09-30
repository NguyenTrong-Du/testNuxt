interface UserInfoDto{
    account_type: string,
    first_name: string,
    last_name: string,
    display_name: string,
    phone_number: string,
    profile_image_file: File,
    nationalities: any[],
    company_name: string,
    company_url: string,
    company_description: string,
    refferal_user_email: string
}

export default UserInfoDto
