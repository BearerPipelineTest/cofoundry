﻿namespace Cofoundry.Domain
{
    /// <summary>
    /// Implementing this allows you to define a custom user area that is completely separate to 
    /// from other user areas, but can take advantage of the same tools for handling and managing 
    /// users, registrations and logins. This is what the Cofoundry admin panel uses for logins,
    /// other examples might be a client area or members only area of your website. The 
    /// username for a user must be unique for each user area, but the same username can exist
    /// in different user areas which allows a person to be a member of each user area. User areas
    /// are very distinct partitions and shouldn't be used for something where Roles and Permissions 
    /// might be more appropriate (e.g. different levels of membership)
    /// </summary>
    public interface IUserAreaDefinition
    {
        /// <summary>
        /// A unique 3 letter code identifying this user area. The cofoundry 
        /// user are uses the code "COF" so you can pick anything else!
        /// </summary>
        string UserAreaCode { get; }

        /// <summary>
        /// Display name of the area, used in the Cofoundry admin panel
        /// as the navigation link to manage your users. This should be singular
        /// because "Users" is appended to the link text.
        /// </summary>
        string Name { get; }

        /// <summary>
        /// Indicates if users in this area can login using a password. If this
        /// is false the password field will be null and login will typically be via
        /// SSO or some other method.
        /// </summary>
        bool AllowPasswordLogin { get; }

        /// <summary>
        /// Indicates whether the user should login using thier email address
        /// as the username. Some SSO systems might provide only a username and not
        /// an email address so in this case the email address is allowed to be 
        /// <see langword="null"/>. 
        /// </summary>
        bool UseEmailAsUsername { get; }

        /// <summary>
        /// The path to a login page to use when a user does not have permission to 
        /// access a resource. The path to the denied resource is appended to the query
        /// string of the <see cref="LoginPath"/> using the parameter name "ReturnUrl".
        /// If set to <see langword="null"/> then a 403 (Forbidden) error page will be 
        /// returned instead of the loginredirect.
        /// </summary>
        string LoginPath { get; }

        /// <summary>
        /// Cofoundry creates an auth scheme for each user area. Use this property to set this
        /// user area as the default auth scheme, which means the HttpContext.User property will 
        /// be set to this identity.
        /// </summary>
        bool IsDefaultAuthScheme { get; }
    }
}
