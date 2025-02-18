﻿using Cofoundry.Domain.Data;
using System.Threading.Tasks;

namespace Cofoundry.Domain.Internal
{
    /// <summary>
    /// Helper used by in user update commands to manage any
    /// required changes to the security stamp.
    /// </summary>
    public interface IUserSecurityStampUpdateHelper
    {
        /// <summary>
        /// Helper to update the security stamp property on the user with
        /// a new value generated by <see cref="ISecurityStampGenerator"/>
        /// </summary>
        /// <param name="user">User record to update.</param>
        void Update(User user);

        /// <summary>
        /// Helper to fire off the <see cref="UserSecurityStampUpdatedMessage"/>
        /// and refresh the user claims principal by calling <see cref="IUserSessionService.RefreshAsync"/>
        /// </summary>
        /// <param name="user">The updated user record.</param>
        Task OnTransactionCompleteAsync(User user);
    }
}
